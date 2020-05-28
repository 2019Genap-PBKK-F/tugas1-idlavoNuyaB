<template>
  <div>
    <div class="container">
      <div class="span4">
        <img src="/static/img/LogoITS.png" class="img-fluid" style="max-width: 75px; float: left">
        <h1 style="padding-left: 90px">
          Indikator Kontrak Kinerja 2020
          <br>
          <small>
            Kepala {{this.id}}
          </small>
        </h1>
      </div>
    </div> 
    <div class="container" style="padding-bottom: 10px">
      <select v-model="id" class="dropdown btn btn-light dropdown-toggle" @change="getDepartemen()">
        <option class="dropdown-item" value="Departemen" disabled>Pilih Satuan Kerja</option>
        <option class="dropdown-item" v-for="dept in departemennya" v-bind:key="dept.id">
            {{dept.nama}}
        </option>
      </select> 
    </div>
    <div id="spreadsheet" class="container">
    </div>
  </div>
</template>

<script>
import WebDataRocks from 'webdatarocks'
import 'webdatarocks/webdatarocks.min.css'
import axios from 'axios'

var host = 'https://10.199.14.46:8017/'

export default {
  data: function() {
    return {
      departemennya: [],
      id: this.user.satuan
    }
  },
  props: ['user'],
  name: 'App',
  methods: {
    getDepartemen() {
      axios.get(host + 'api/konkin').then(res => {
        var count = Object.keys(res.data).length
        var count2 = Object.keys(this.departemennya).length
        var hasil = []
        var j = 0
        var temp
        var temporal = []
        for (var l = 0; l < count2; l++) {
          if (this.id === this.departemennya[l].name) {
            temp = this.departemennya[l]
          }
        }
        for (var i = 0; i < count; i++) {
          for (var h = 0; h < 8; h++) {
            temporal[h] = temp.name[h]
          }
          if (temporal.join('') === 'Fakultas') {
            if (temp.id === res.data[i].Induk || temp.id === res.data[i].ID) {
              hasil[j] = res.data[i]
              j = j + 1
            }
          } else {
            if (temp.name === res.data[i].Satuan) {
              hasil[j] = res.data[i]
              j = j + 1
            }
          }
        }
        for (var k in hasil) {
          delete hasil[k].Induk
          delete hasil[k].ID
          delete hasil[k].apk
        }
        this.webdatarocks.updateData({
          dataSourceType: 'json',
          data: hasil
        })
      })
    }
  },
  mounted: function () {
    axios.get(host + 'api/konkin').then(res => {
      axios.get(host + 'api/satker/namadropdown').then(resp => {
        this.departemennya = resp.data
        var count = Object.keys(res.data).length
        var hasil = []
        var temp = []
        var j = 0
        for (var i = 0; i < count; i++) {
          for (var l = 0; l < 8; l++) {
            temp[l] = this.user.satuan[l]
          }
          if (temp.join('') === 'Fakultas') {
            if (this.user.idnya === res.data[i].Induk || this.user.idnya === res.data[i].ID) {
              hasil[j] = res.data[i]
              j = j + 1
            }
          } else {
            if (this.user.satuan === res.data[i].Satuan) {
              hasil[j] = res.data[i]
              j = j + 1
            }
          }
        }
        for (var k in hasil) {
          delete hasil[k].Induk
          delete hasil[k].ID
          delete hasil[k].apk
        }
        this.webdatarocks = new WebDataRocks({
          container: '#spreadsheet',
          toolbar: true,
          report: {
            dataSource: {
              dataSourceType: 'json',
              data: hasil
            },
            options: {
              grid: {
                type: 'flat',
                showGrandTotals: 'off'
              }
            }
          }
        })
      })
    })
  }
}
</script>
