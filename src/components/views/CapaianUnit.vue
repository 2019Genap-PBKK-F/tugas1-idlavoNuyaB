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

var host = 'https://10.199.14.46:8017/'

var temp = {}
var changed = function(instance, cell, x, y, value) {
  var datatemp = []
  axios.get(host + 'api/capaianunit/').then((response) => {
    datatemp = Object.values(response.data[y])
    var dasar = datatemp[0]
    var unit = datatemp[1]
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/capaianunit/' + unit + dasar,
      data: {
        id_satker: datatemp[0],
        id_datadasar: datatemp[1],
        capaian: datatemp[3]
      }
    }).then((response) => {
      console.log('Update Berhasil')
    })
  })
}

var insertrow = function(instance) {
  axios.get(host + 'api/satker/nama').then(res => {
    var count = Object.keys(res.data).length
    var hasil = []
    var sebenarnya = []
    var j = 0
    for (var i = 0; i < count; i++) {
      hasil[i] = Object.values(res.data[i])
      sebenarnya[i] = hasil[i][0]
      j = j + 1
    }
    var randoman = Math.floor(Math.random() * j)
    var adalah = sebenarnya[randoman]
    axios({
      method: 'post',
      url: host + 'api/capaianunit/',
      data: {
        id_satker: adalah,
        id_datadasar: 1,
        capaian: 0
      }
    }).then((response) => {
      console.log('Insert Berhasil')
    }).catch(err => {
      console.log(err)
    })
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
    axios.delete(host + 'api/capaianunit/' + tes[1] + tes[0])
    console.log('Delete Success')
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
        axios.get(host + 'api/satker/nama').then(resp => {
          axios.get(host + 'api/datadasar/nama').then(response => {
            console.log('Data ke load')
            var options = {
              data: temporal,
              onchange: changed,
              oninsertrow: insertrow,
              ondeleterow: deleterow,
              allowToolbar: true,
              columns: [
                { type: 'dropdown', title: 'ID Satker', width: '120px', autocomplete: true, source: resp.data },
                { type: 'dropdown', title: 'ID DataDasar', width: '120px', autocomplete: true, source: response.data },
                { type: 'text', title: 'Waktu', width: '120px', readOnly: true },
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
