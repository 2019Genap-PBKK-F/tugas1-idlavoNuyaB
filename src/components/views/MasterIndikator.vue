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

var host = 'http://nekopar.moe:8000/'

var temp = {}
var changed = function(instance, cell, x, y, value) {
  var datatemp = []
  axios.get(host + 'api/masterindikator/').then((response) => {
    datatemp = Object.values(response.data[y])
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/masterindikator/' + datatemp[0],
      data: {
        id: datatemp[0],
        id_penyebut: datatemp[1],
        id_pembilang: datatemp[2],
        nama: datatemp[3],
        deskripsi: datatemp[4],
        default_bobot: datatemp[5],
        expired_date: datatemp[8]
      }
    }).then((response) => {
      console.log(response.data)
      console.log('Update Berhasil')
    })
  })
}

var insertrow = function(instance) {
  axios({
    method: 'post',
    url: host + 'api/masterindikator/',
    data: {
      id_penyebut: 1,
      id_pembilang: 1,
      nama: '',
      deskripsi: ' ',
      default_bobot: 0
    }
  }).then((response) => {
    console.log(response.data)
    console.log('Insert Berhasil')
  }).catch(err => {
    console.log(err)
  })
}

var deleterow = function(instance, id) {
  var tes
  axios({
    method: 'get',
    url: host + 'api/masterindikator/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/masterindikator/' + tes[0])
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
      axios.get(host + 'api/masterindikator/').then(res => {
        temp = res.data
        axios.get(host + 'api/datadasar/nama/').then(resp => {
          var tes = resp.data
          console.log('Data ke load')
          var options = {
            data: temp,
            onchange: changed,
            oninsertrow: insertrow,
            ondeleterow: deleterow,
            allowToolbar: true,
            columns: [
              { type: 'hidden', title: 'id', width: '120px' },
              { type: 'dropdown', title: 'ID Penyebut', width: '120px', source: tes },
              { type: 'dropdown', title: 'ID Pembilang', width: '120px', source: resp.data },
              { type: 'text', title: 'Nama', width: '120px' },
              { type: 'text', title: 'Deskripsi', width: '120px' },
              { type: 'text', title: 'Default Bobot', width: '120px' },
              { type: 'text', title: 'Create_Date', width: '120px', readOnly: true },
              { type: 'text', title: 'Last_Update', width: '120px', readOnly: true },
              { type: 'text', title: 'Expired_Date', width: '120px', readOnly: true }
            ]
          }
          let spreadsheet = jexcel(this.$el, options)
          Object.assign(this, { spreadsheet })
        })
      })
    }
  }
}
</script>
