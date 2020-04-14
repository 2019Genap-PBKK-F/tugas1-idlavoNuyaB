<template>
  <ul class="sidebar-menu">
    <li class="header">Unit</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Kategori Unit</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/dd">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Data Dasar</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/unit">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Unit</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/cu">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Capaian Unit</span>
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
