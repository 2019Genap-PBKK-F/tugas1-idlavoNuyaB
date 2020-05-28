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
  axios.get(host + 'api/indikatorsatker/').then((response) => {
    datatemp = Object.values(response.data[y])
    var dasar = datatemp[0]
    var unit = datatemp[1]
    var units = datatemp[2]
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/indikatorsatker/' + unit + '/' + dasar + '/' + units,
      data: {
        id_periode: datatemp[0],
        id_master: datatemp[1],
        id_satker: datatemp[2],
        bobot: datatemp[3],
        target: datatemp[4],
        capaian: datatemp[5]
      }
    }).then((response) => {
      console.log('Update Berhasil')
    })
  })
}

var insertrow = function(instance) {
  axios.get(host + 'api/periode/nama').then(res => {
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
    axios.get(host + 'api/satker/nama').then(respo => {
      var counts = Object.keys(res.data).length
      var hasils = []
      var sebenarnyas = []
      var js = 0
      for (var is = 0; is < counts; is++) {
        hasils[is] = Object.values(respo.data[is])
        sebenarnyas[is] = hasils[is][0]
        js = js + 1
      }
      var randomans = Math.floor(Math.random() * js)
      var adalahs = sebenarnyas[randomans]
      axios({
        method: 'post',
        url: host + 'api/indikatorsatker/',
        data: {
          id_periode: adalah,
          id_master: 8,
          id_satker: adalahs,
          bobot: 0,
          target: 0,
          capaian: 0
        }
      }).then((response) => {
        console.log('Insert Berhasil')
      }).catch(err => {
        console.log(err)
      })
    })
  })
}

var deleterow = function(instance, id) {
  var tes
  axios({
    method: 'get',
    url: host + 'api/indikatorsatker/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/indikatorsatker/' + tes[0] + tes[1] + tes[2])
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
      axios.get(host + 'api/indikatorsatker/').then(res => {
        temp = res.data
        axios.get(host + 'api/periode/nama').then(resp => {
          axios.get(host + 'api/masterindikator/nama').then(response => {
            axios.get(host + 'api/satker/nama').then(respo => {
              console.log('Data ke load')
              var options = {
                data: temp,
                onchange: changed,
                oninsertrow: insertrow,
                ondeleterow: deleterow,
                allowToolbar: true,
                columns: [
                  { type: 'dropdown', title: 'ID Periode', width: '120px', autocomplete: true, source: resp.data },
                  { type: 'dropdown', title: 'ID Master', width: '120px', autocomplete: true, source: response.data },
                  { type: 'dropdown', title: 'ID Satker', width: '120px', autocomplete: true, source: respo.data },
                  { type: 'text', title: 'Bobot', width: '120px' },
                  { type: 'text', title: 'Target', width: '120px' },
                  { type: 'text', title: 'Capaian', width: '120px' },
                  { type: 'text', title: 'Last_Update', width: '120px', readOnly: true }
                ]
              }
              let spreadsheet = jexcel(this.$el, options)
              Object.assign(this, { spreadsheet })
            })
          })
        })
      })
    }
  }
}
</script>
