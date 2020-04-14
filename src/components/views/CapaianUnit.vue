<template>
  <div>
    <div id="spreadsheet" class="container">
      <input class="btn-primary" type="button" value="Add new row" @click="() => spreadsheet.insertRow()" />
      <input class="btn-primary" type="button" value="Delete row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

var host = 'http://10.199.14.46:8017/'

var temp = {}
var changed = function(instance, cell, x, y, value) {
  var datatemp = []
  axios.get(host + 'api/capaianunit/').then((response) => {
    // console.log(response.data)
    datatemp = Object.values(response.data[y])
    var dasar = datatemp[0]
    var unit = datatemp[1]
    datatemp[x] = value
    console.log(datatemp)
    axios({
      method: 'put',
      url: host + 'api/capaianunit/' + dasar + unit,
      data: {
        DataDasar_id: datatemp[0],
        Unit_id: datatemp[1],
        waktu: datatemp[2],
        capaian: datatemp[3]
      }
    }).then((response) => {
      console.log(response.data)
    })
  })
}

var insertrow = function(instance, x, y) {
  axios({
    method: 'post',
    url: host + 'api/capaianunit/',
    data: {
      DataDasar_id: 1,
      Unit_id: 0,
      waktu: null,
      capaian: 0
    }
  }).then((response) => {
    console.log(response.data)
  }).catch(err => {
    console.log(err)
  })
}

var deleterow = function(instance, id) {
  var tes
  axios({
    method: 'get',
    url: host + 'api/capaianunit/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/capaianunit/' + tes[0] + tes[1])
    console.log('Success')
  })
}

export default {
  name: 'App',
  mounted: function () {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/capaianunit/').then(res => {
        temp = res.data
        var tes = Object.keys(temp).length
        var temporal = []
        for (var i = 0; i < tes; i++) {
          temporal[i] = Object.values(temp[i])
          var datetime = new Date(temporal[i][2])
          temporal[i][2] = datetime.toISOString().replace('Z', '').replace('T', ' ')
        }
        console.log(temporal)
        var datadasar = []
        var sourcedasar = []
        var datau = []
        var sourceu = []
        axios.get(host + 'api/unit/').then(resp => {
          var count = Object.keys(resp.data).length
          for (var i = 0; i < count; i++) {
            datau[i] = Object.values(resp.data[i])
            sourceu[i] = datau[i][0]
            sourceu[i] = sourceu[i].toString()
          }
          axios.get(host + 'api/datadasar/').then(response => {
            var counts = Object.keys(response.data).length
            for (var i = 0; i < counts; i++) {
              datadasar[i] = Object.values(response.data[i])
              sourcedasar[i] = datadasar[i][0]
              sourcedasar[i] = sourcedasar[i].toString()
            }
            console.log(sourceu)
            var options = {
              data: temporal,
              onchange: changed,
              oninsertrow: insertrow,
              ondeleterow: deleterow,
              allowToolbar: true,
              style: [],
              columns: [
                { type: 'dropdown', title: 'DataDasar_id', width: '120px', autocomplete: true, source: sourcedasar },
                { type: 'dropdown', title: 'Unit_id', width: '120px', autocomplete: true, source: sourceu },
                { type: 'calendar', options: {format: 'YYYY-MM-DD HH24:MI:SS', time: 1}, title: 'Waktu', width: '120px' },
                { type: 'text', title: 'Capaian', width: '120px' }
              ]
            }
            let spreadsheet = jexcel(this.$el, options)
            Object.assign(this, { spreadsheet })
          })
        })
      })
    }
  }
}
</script>
