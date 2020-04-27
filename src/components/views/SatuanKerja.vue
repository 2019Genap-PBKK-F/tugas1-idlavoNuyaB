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
  axios.get(host + 'api/satker/').then((response) => {
    datatemp = Object.values(response.data[y])
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/satker/' + datatemp[0],
      data: {
        id: datatemp[0],
        id_jns_satker: datatemp[4],
        id_induk_satker: datatemp[5],
        nama: datatemp[1],
        level_unit: datatemp[3],
        email: datatemp[2]
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
    url: host + 'api/satker/',
    data: {
      id_jns_satker: null,
      id_induk_satker: null,
      level_unit: 0,
      nama: '',
      email: ''
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
    url: host + 'api/satker/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    console.log(tes[0])
    axios.delete(host + 'api/satker/' + tes[0], {data: {id: tes[0]}})
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
      axios.get(host + 'api/satker/').then(res => {
        temp = res.data
        axios.get(host + 'api/satker/nama/').then(resp => {
          var tes = resp.data
          console.log(tes)
          axios.get(host + 'api/jenissatker/nama/').then(re => {
            var hasil = re.data
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
                { type: 'hidden', title: 'id', width: '10px' },
                { type: 'text', title: 'Nama', width: '480px' },
                { type: 'text', title: 'Email', width: '200px' },
                { type: 'text', title: 'Level Unit', width: '80px' },
                { type: 'dropdown', title: 'Jenis Satker', width: '200px', source: hasil },
                { type: 'dropdown', title: 'Induk Satker', width: '480px', source: resp.data },
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
