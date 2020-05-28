<template>
  <li class="dropdown user user-menu">
    <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
      <!-- The user image in the navbar-->
      <!-- hidden-xs hides the username on small devices so only the image appears. -->
      <span class="hidden-xs">{{user.satuan}}</span>
    </a>
    <!-- Account Info and Menu -->
    <ul class="dropdown-menu">
      <li class="user-header" style="height:auto;min-height:85px;padding-bottom:15px;">
        <p>
          <span>{{user.satuan}}</span>
        </p>
      </li>
      <li class="user-footer">
        <a  @click="logout()" class="btn btn-default btn-flat btn-block">
          <i class="fa fa-sign-out"></i>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'UserMenu',
  props: ['user'],
  methods: {
    logout () {
      this.$store.commit('SET_USER', null)
      this.$store.commit('SET_TOKEN', null)

      if (window.localStorage) {
        window.localStorage.setItem('user', null)
        window.localStorage.setItem('token', null)
      }
      this.$router.push('/login')
      console.log('Logout success')
    }
  }
}
</script>
