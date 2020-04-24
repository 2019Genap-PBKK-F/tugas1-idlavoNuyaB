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
  axios.get(host + 'api/aspek/').then((response) => {
    datatemp = Object.values(response.data[y])
    datatemp[x] = value
    axios({
      method: 'put',
      url: host + 'api/aspek/' + datatemp[0],
      data: {
        id: datatemp[0],
        aspek: datatemp[1],
        komponen_aspek: datatemp[2]
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
    url: host + 'api/aspek/',
    data: {
      aspek: ' ',
      komponen_aspek: ' '
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
    url: host + 'api/aspek/',
    data: {
    }
  }).then((response) => {
    tes = Object.values(response.data[id])
    axios.delete(host + 'api/aspek/' + tes[0])
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
      axios.get(host + 'api/aspek/').then(res => {
        temp = res.data
        console.log('Data ke load')
        var options = {
          data: temp,
          onchange: changed,
          oninsertrow: insertrow,
          ondeleterow: deleterow,
          allowToolbar: true,
          columns: [
            { type: 'hidden', title: 'id', width: '120px' },
            { type: 'text', title: 'Aspek', width: '120px' },
            { type: 'text', title: 'Komponen Aspek', width: '120px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    }
  }
}
</script>
