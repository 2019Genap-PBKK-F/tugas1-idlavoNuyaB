<template>
  <ul class="sidebar-menu">
    <li class="header">Unit</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Data Dasar</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/cu">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Capaian Unit</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/ip">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Indikator Periode</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/is">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Indikator Satuan Kerja</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/isl">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Indikator Satuan Kerja Log</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/js">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Jenis Satuan Kerja</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/mi">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Master Indikator</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/p">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Periode</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/sk">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Satuan Kerja</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu'
}
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
