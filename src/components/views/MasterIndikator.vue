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
  axios.get(host + 'api/masterindikator/').then((response) => {
    datatemp = Object.values(response.data[y])
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/masterindikator/' + datatemp[0],
      data: {
        id: datatemp[0],
        id_aspek: datatemp[3],
        id_penyebut: datatemp[2],
        id_pembilang: datatemp[1],
        nama: datatemp[4],
        deskripsi: datatemp[5],
        default_bobot: datatemp[6],
        expired_date: datatemp[9]
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
      id_aspek: 1,
      id_penyebut: 2,
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
        axios.get(host + 'api/aspek/nama').then(respo => {
          axios.get(host + 'api/datadasar/nama/').then(resp => {
            var tes = resp.data
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
                { type: 'hidden', title: 'id', width: '120px' },
                { type: 'dropdown', title: 'ID Pembilang', width: '300px', source: resp.data, autocomplete: true },
                { type: 'dropdown', title: 'ID Penyebut', width: '300px', source: tes, autocomplete: true },
                { type: 'dropdown', title: 'ID Aspek', width: '140px', source: respo.data, autocomplete: true },
                { type: 'text', title: 'Nama', width: '300px' },
                { type: 'text', title: 'Deskripsi', width: '480px' },
                { type: 'text', title: 'Default Bobot', width: '80px' },
                { type: 'text', title: 'Create_Date', width: '180px', readOnly: true },
                { type: 'text', title: 'Last_Update', width: '180px', readOnly: true },
                { type: 'text', title: 'Expired_Date', width: '180px', readOnly: true }
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
