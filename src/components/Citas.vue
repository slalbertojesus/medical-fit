<template>
  <v-container>
    <h3>{{currentDateTime()}}</h3>
    <v-row v-if="this.citas != 0">
    <h2 >Citas del día</h2>
    </v-row>
    <v-row no-gutters>
      <v-row justify="center" v-if="this.citas == 0">
        <v-btn x-large outlined color="success" dark>
          Agregar una cita nueva   
          <v-icon>
            mdi-calendar-plus
          </v-icon>
        </v-btn>
      </v-row>
      <v-list-item
        class="justify-center"
        v-for="chat in citas"
        :key="chat.title"
        v-else
      >
        <v-row class="mx-7 ma-2" no-gutters>
          <v-col cols="3" md="2">
            <subtitle-1>{{ chat.hora }}</subtitle-1>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card ripple color="primary">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    :alt="`${chat.title} avatar`"
                    :src="chat.avatar"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-title class="mr-1 white--text">{{
                  chat.title
                }}</v-list-item-title>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="white" dark v-bind="attrs" v-on="on">
                      mdi-pencil
                    </v-icon>
                  </template>
                  <span>Editar cita</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="white" dark v-bind="attrs" v-on="on">
                      mdi-history
                    </v-icon>
                  </template>
                  <span>Historial médico</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="white" dark v-bind="attrs" v-on="on">
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                  <span>Eliminar cita</span>
                </v-tooltip>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-row>
  </v-container>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  mounted() {
    EventBus.$on("getCitas", (selectedDate) => {
      this.selectedDate = selectedDate;
      this.header = selectedDate;
    });
  },
  methods: {
   currentDateTime() {
      const current = new Date();
      const mes = current.toLocaleString('es-MX', { month: 'long' });
      const day = current.getDay();
      const año = current.getFullYear();
      const fecha = day + ' de ' + mes + ' del ' + año;
      return fecha;
    }
  },
  data: () => ({
    selectedDate: null,
    citas: [],
  }),
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
