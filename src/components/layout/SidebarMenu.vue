<template>
  <ul class="sidebar-menu">
    <li class="header">Unit</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Kontrak Kinerja</span>
      </a>
    </router-link>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span class="treeview-title">CRUD</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/a">
          <a>
            <i class="fa fa-table"></i> Aspek
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/cu">
          <a hre>
            <i class="fa fa-table"></i> Capaian Unit
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/dd">
          <a>
            <i class="fa fa-table"></i> Data Dasar
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/ip">
          <a>
            <i class="fa fa-table"></i> Indikator Periode
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/is">
          <a>
            <i class="fa fa-table"></i> Indikator Satuan Kerja
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/isl">
          <a>
            <i class="fa fa-table"></i> Indikator Satuan Kerja
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/js">
          <a>
            <i class="fa fa-table"></i> Jenis Satuan Kerja
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/mi">
          <a>
            <i class="fa fa-table"></i> Master Indikator
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/p">
          <a>
            <i class="fa fa-table"></i> Periode
          </a>]
        </router-link>
        <router-link tag="li" class="pageLink" to="/sk">
          <a>
            <i class="fa fa-table"></i> Satuan Kerja
          </a>
        </router-link>
      </ul>
    </li>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span class="treeview-title">View</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/ab">
          <a>
            <i class="fa fa-table"></i> Abmas
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/d">
          <a>
            <i class="fa fa-table"></i> Dosen
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/pe">
          <a>
            <i class="fa fa-table"></i> Penelitian
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/pu">
          <a>
            <i class="fa fa-table"></i> Publikasi
          </a>
        </router-link>
      </ul>
    </li>
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
