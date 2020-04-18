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

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0
    var v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

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
        id_jns_satker: datatemp[1],
        id_induk_satker: datatemp[2],
        nama: datatemp[3],
        email: datatemp[4]
      }
    }).then((response) => {
      console.log(response.data)
      console.log('Update Berhasil')
    })
  })
}

var insertrow = function(instance) {
  var idi = uuidv4()
  console.log(idi)
  axios({
    method: 'post',
    url: host + 'api/satker/',
    data: {
      id: idi,
      id_jns_satker: 1,
      id_induk_satker: idi,
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
              allowToolbar: true,
              columns: [
                { type: 'hidden', title: 'id', width: '120px' },
                { type: 'dropdown', title: 'Jenis Satker', width: '120px', source: hasil },
                { type: 'dropdown', title: 'Induk Satker', width: '120px', source: resp.data },
                { type: 'text', title: 'Nama', width: '120px' },
                { type: 'text', title: 'Email', width: '120px' },
                { type: 'text', title: 'Create_Date', width: '120px', readOnly: true },
                { type: 'text', title: 'Last_Update', width: '120px', readOnly: true },
                { type: 'text', title: 'Expired_Date', width: '120px', readOnly: true }
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
