<template>
    <div id="spreadsheet">
        <input type="button" value="Add new row" onclick="vm.insertRow()" />
    </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'

var data = [
  ['05111740000085', 'Bayu Novaldi', '2017', 'Laki-Laki', '04/11/1998', '', true]
]

var options = {
  data: data,
  allowToolbar: true,
  columns: [
    { type: 'text', title: 'NRP', width: '120px' },
    { type: 'text', title: 'Nama', width: '120px' },
    { type: 'text', title: 'Angkatan', width: '120px' },
    { type: 'dropdown', title: 'Jenis Kelamin', width: '250px', source: ['Laki-Laki', 'Perempuan'] },
    { type: 'calendar', title: 'Tgl-Lahir', width: '250px' },
    { type: 'image', title: 'Photo', width: '120px' },
    { type: 'checkbox', title: 'Aktif', width: '80px' }
    // { type: 'dropdown', title: 'Make', width: '250px', source: [ 'Alfa Romeo', 'Audi', 'Bmw' ] },
    // { type: 'calendar', title: 'Available', width: '250px' },
    // { type: 'image', title: 'Photo', width: '120px' },
    // { type: 'checkbox', title: 'Stock', width: '80px' },
    // { type: 'numeric', title: 'Price', width: '100px', mask: '$ #.##,00', decimal: ',' },
    // { type: 'color', width: '100px', render: 'square' }
  ]
}

export default {
  name: 'App',
  mounted: function () {
    let spreadsheet = jexcel(this.$el, options)
    Object.assign(this, { spreadsheet })
  }
}
</script>
