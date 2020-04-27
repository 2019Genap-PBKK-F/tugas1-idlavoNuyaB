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
  axios.get(host + 'api/indikatorperiode/').then((response) => {
    datatemp = Object.values(response.data[y])
    var dasar = datatemp[0]
    var unit = datatemp[1]
    datatemp[x] = value
    console.log(datatemp)
    axios({
      method: 'put',
      url: host + 'api/indikatorperiode/' + dasar + unit,
      data: {
        id_master: datatemp[0],
        id_periode: datatemp[1],
        bobot: datatemp[2]
      }
    }).then((response) => {
      console.log(response.data)
      console.log('Update Berhasil')
    })
  })
}

var insertrow = function(instance) {
  axios.get(host + 'api/masterindikator/nama').then(res => {
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
    console.log(randoman)
    axios({
      method: 'post',
      url: host + 'api/indikatorperiode/',
      data: {
        id_master: adalah,
        id_periode: 2020,
        bobot: 0
      }
    }).then((response) => {
      console.log(response.data)
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
    url: host + 'api/indikatorperiode/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/indikatorperiode/' + tes[0] + tes[1])
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
      axios.get(host + 'api/indikatorperiode/').then(res => {
        temp = res.data
        axios.get(host + 'api/masterindikator/nama').then(resp => {
          axios.get(host + 'api/periode/nama').then(response => {
            console.log('Data ke load')
            var options = {
              data: temp,
              onchange: changed,
              oninsertrow: insertrow,
              ondeleterow: deleterow,
              tableOverflow: true,
              tableWidth: '1120px',
              tableHeight: '480px',
              lazyLoading: true,
              loadingSpin: true,
              allowToolbar: true,
              columns: [
                { type: 'dropdown', title: 'ID Master', width: '1000px', autocomplete: true, source: resp.data },
                { type: 'dropdown', title: 'ID Periode', width: '120px', autocomplete: true, source: response.data },
                { type: 'text', title: 'Bobot', width: '120px' }
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
