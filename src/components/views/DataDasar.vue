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
  axios.get(host + 'api/datadasar/').then((response) => {
    datatemp = Object.values(response.data[y])
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/datadasar/' + datatemp[0],
      data: {
        id: datatemp[0],
        nama: datatemp[1]
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
    url: host + 'api/datadasar/',
    data: {
      nama: ' '
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
    url: host + 'api/datadasar/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/datadasar/' + tes[0])
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
      axios.get(host + 'api/datadasar/').then(res => {
        temp = res.data
        console.log('Data ke load')
        var options = {
          data: temp,
          onchange: changed,
          oninsertrow: insertrow,
          ondeleterow: deleterow,
          allowToolbar: true,
          tableOverflow: true,
          tableWidth: '1100px',
          tableHeight: '480px',
          lazyLoading: true,
          loadingSpin: true,
          columns: [
            { type: 'hidden', title: 'id', width: '120px' },
            { type: 'text', title: 'Nama', width: '900px' },
            { type: 'text', title: 'Create_Date', width: '180px', readOnly: true },
            { type: 'text', title: 'Last_Update', width: '180px', readOnly: true },
            { type: 'text', title: 'Expired_Date', width: '180px', readOnly: true }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    }
  }
}
</script>
