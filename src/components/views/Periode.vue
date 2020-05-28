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
  axios.get(host + 'api/periode/').then((response) => {
    datatemp = Object.values(response.data[y])
    var dasar = datatemp[0]
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/periode/' + dasar,
      data: {
        id: datatemp[0],
        nama: datatemp[1]
      }
    }).then((response) => {
      console.log('Update Berhasil')
    })
  })
}

var insertrow = function(instance) {
  axios({
    method: 'post',
    url: host + 'api/periode/',
    data: {
      id: 1000,
      nama: ' '
    }
  }).then((response) => {
    console.log('Insert Berhasil')
  }).catch(err => {
    console.log(err)
  })
}

var deleterow = function(instance, id) {
  var tes
  axios({
    method: 'get',
    url: host + 'api/periode/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/periode/' + tes[0])
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
      axios.get(host + 'api/periode/').then(res => {
        temp = res.data
        console.log('Data ke load')
        var options = {
          data: temp,
          onchange: changed,
          oninsertrow: insertrow,
          ondeleterow: deleterow,
          allowToolbar: true,
          columns: [
            { type: 'text', title: 'ID', width: '120px' },
            { type: 'text', title: 'Nama', width: '120px' },
            { type: 'text', title: 'Create_Date', width: '180px', readOnly: true },
            { type: 'text', title: 'Last_Update', width: '180px', readOnly: true }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    }
  }
}
</script>
