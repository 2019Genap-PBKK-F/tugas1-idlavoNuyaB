<template>
  <div>
    <div id="spreadsheet" class="container" style="padding-top:20px">
    </div>
  </div>
</template>

<script>
import WebDataRocks from 'webdatarocks'
import 'webdatarocks/webdatarocks.min.css'
import axios from 'axios'

var host = 'https://10.199.14.46:8017/'

export default {
  name: 'App',
  mounted: function () {
    axios.get(host + 'api/dosen').then(res => {
      this.webdatarocks = new WebDataRocks({
        container: '#spreadsheet',
        toolbar: true,
        report: {
          dataSource: {
            dataSourceType: 'json',
            data: res.data
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
  }
}
</script>
