<template>
  <div>
    <div id="spreadsheet" class="container">
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

var host = 'https://10.199.14.46:8017/'

var temp = {}

export default {
  name: 'App',
  mounted: function () {
    this.load()
  },
  methods: {
    load() {
      axios.get(host + 'api/indikatorsatkerlog/').then(res => {
        temp = res.data
        console.log('Data ke load')
        var options = {
          data: temp,
          allowToolbar: true,
          columns: [
            { type: 'text', title: 'ID Periode', width: '120px', readOnly: true },
            { type: 'text', title: 'ID Master', width: '120px', readOnly: true },
            { type: 'text', title: 'ID Satker', width: '120px', readOnly: true },
            { type: 'text', title: 'Capaian', width: '120px', readOnly: true },
            { type: 'text', title: 'Created_Date', width: '120px', readOnly: true }
          ]
        }
        let spreadsheet = jexcel(this.$el, options)
        Object.assign(this, { spreadsheet })
      })
    }
  }
}
</script>
