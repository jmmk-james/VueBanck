<template>
    <div class="container">
        <img alt="Vue logo" src="../assets/img/bunion.jpg" width="5%" height="5%">
        <h1>Id Cliente : {{id_Cliente}} </h1>
        <CuentasApp :idCliente="id_Cliente"/>
    </div>
</template>

<script>
// @ is an alias to /src
import CuentasApp from '@/components/CuentasApp.vue'

export default {
  name: 'Cuentas',
  components: {
    CuentasApp
  },
  data(){
      return {id_Cliente:this.$route.params.id_cliente}
  }
}
</script>
