<template>
  <v-app>
    
    <v-main>
      <Wrapper />
    </v-main>
  </v-app>
</template>

<script>
import Wrapper from './components/Wrapper';

export default {
  name: 'App',

  components: {
    Wrapper,
  },

  data: () => ({
    //
  }),
};
</script>
