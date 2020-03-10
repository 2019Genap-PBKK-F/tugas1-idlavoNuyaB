<template>
  <div>
    <div id="spreadsheet">
      <input class="btn-primary" type="button" value="Add new row" @click="() => spreadsheet.insertRow()" />
      <input class="btn-primary" type="button" value="Delete row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

var temp = {}
var changed = function(instance, cell, x, y, value) {
  x = parseInt(x)
  y = parseInt(y)
  var datatemp = []
  datatemp[0] = y + 1
  axios.get('http://localhost:8017/api/mahasiswa/' + datatemp[0]).then((response) => {
    console.log(response.data)
    datatemp = Object.values(response.data[0])
    datatemp[x] = value
    console.log(datatemp)
    axios({
      method: 'put',
      url: 'http://localhost:8017/api/mahasiswa/' + datatemp[0],
      data: {
        id: datatemp[0],
        nrp: datatemp[1],
        nama: datatemp[2],
        angkatan: datatemp[3],
        jeniskelamin: datatemp[4],
        tgllahir: datatemp[5],
        photo: datatemp[6],
        aktif: datatemp[7]
      }
    }).then((response) => {
      console.log(response.data)
    })
  })
}

var insertrow = function(instance, id) {
  var x = parseInt(id) + 2
  console.log(x)
  axios({
    method: 'post',
    url: 'http://localhost:8017/api/mahasiswa/',
    data: {
      id: x,
      nrp: ' ',
      nama: ' ',
      angkatan: ' ',
      jeniskelamin: ' ',
      tgllahir: ' ',
      photo: ' ',
      aktif: 0
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
    url: 'http://localhost:8017/api/mahasiswa/',
    data: {
    }
  }).then((response) => {
    tes = Object.keys(response.data[id]).map(function (key) {
      console.log(response.data[id])
      return response.data[id][key]
    })
    axios.delete('http://localhost:8017/api/mahasiswa/' + tes[0])
  })
}

export default {
  name: 'App',
  mounted: function () {
    this.load()
  },
  methods: {
    load() {
      axios.get('http://localhost:8017/api/mahasiswa/').then(res => {
        temp = res.data
        console.log(temp)
        var options = {
          // url: 'http://localhost:3000/mahasiswa',
          data: temp,
          onchange: changed,
          oninsertrow: insertrow,
          ondeleterow: deleterow,
          allowToolbar: true,
          columns: [
            { type: 'hidden', title: 'id', width: '120px' },
            { type: 'text', title: 'NRP', width: '120px' },
            { type: 'text', title: 'Nama', width: '120px' },
            { type: 'text', title: 'Angkatan', width: '120px' },
            { type: 'dropdown', title: 'Jenis Kelamin', width: '250px', autocomplete: true, source: ['Laki-Laki', 'Perempuan'] },
            { type: 'calendar', title: 'Tgl-Lahir', width: '250px' },
            { type: 'image', title: 'Photo', width: '120px' },
            { type: 'checkbox', title: 'Aktif', width: '80px' }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    }
  }
}
</script>
