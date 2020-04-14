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
  x = parseInt(x)
  y = parseInt(y)
  var datatemp = []
  datatemp[0] = y + 1
  axios.get(host + 'api/unit/' + datatemp[0]).then((response) => {
    console.log(response.data)
    datatemp = Object.values(response.data[0])
    datatemp[x] = value
    console.log(datatemp)
    axios({
      method: 'put',
      url: host + 'api/unit/' + datatemp[0],
      data: {
        id: datatemp[0],
        nama: datatemp[1],
        KategoriUnit_id: datatemp[2]
      }
    }).then((response) => {
      console.log(response.data)
    })
  })
}

var insertrow = function(instance) {
  axios({
    method: 'post',
    url: host + 'api/unit/',
    data: {
      nama: '',
      KategoriUnit_id: null
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
    url: host + 'api/unit/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/unit/' + tes[0])
  })
}

export default {
  name: 'App',
  mounted: function () {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/unit/').then(res => {
        temp = res.data
        var dataku = []
        var sourceku = []
        axios.get(host + 'api/kategoriunit').then(resp => {
          var count = Object.keys(resp.data).length
          for (var i = 0; i < count; i++) {
            dataku[i] = Object.values(resp.data[i])
            sourceku[i] = dataku[i][0]
            sourceku[i] = sourceku[i].toString()
          }
          console.log(sourceku)
          var options = {
            data: temp,
            onchange: changed,
            oninsertrow: insertrow,
            ondeleterow: deleterow,
            allowToolbar: true,
            columns: [
              { type: 'hidden', title: 'id', width: '120px' },
              { type: 'text', title: 'Nama', width: '120px' },
              { type: 'dropdown', title: 'KategoriUnit_id', width: '120px', source: sourceku }
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
