<template>
  <v-app>
    <v-main>
      <Agenda/>
    </v-main>
  </v-app>
</template>

<script>
import Agenda from './components/Agenda';

export default {
  name: 'App',

  components: {
   Agenda 
  },

  data: () => ({
    //
  }),
};
</script>
