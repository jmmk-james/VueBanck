<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/img/bunion.jpg" width="5%" height="5%">
    <h1>Clientes</h1>
    <ClienteApp/>
  </div>
</template>

<script>
// @ is an alias to /src
import ClienteApp from '@/components/ClienteApp.vue'

export default {
  name: 'HomeView',
  components: {
    ClienteApp
  }
}
</script>
