<template>
  <div class="body">
    <nav style="margin-bottom:30px;">
      <v-tabs>
        <v-tab>
          <router-link to="/" tag="button" class="link" active-class="link--active" exact>HOME</router-link>
        </v-tab>
        <v-tab>
          <router-link to="/users/" tag="button" class="link" active-class="link--active">USERS</router-link>
        </v-tab>
      </v-tabs>    
    </nav>
    <router-view/>
  </div>
</template>

<style scoped>
  .body{
    margin-left:100px;
    margin-top:100px;
  }
  .link{
      margin-right:10px;
  }
  .link--active{
      font-size:30px;
  }
</style>