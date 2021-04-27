<template>
  <v-container>
    <v-row no-gutters>
      <v-list-item
        class="justify-center"
        v-for="chat in citas"
        :key="chat.title"
      >
        <v-row class="mx-4 ma-2" no-gutters>
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
                <v-list-item-title class="white--text">{{
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
  },
  data: () => ({
    selectedDate: null,
    citas: [
       {
        fecha: "2021-04-09",
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Miguel Hernández",
        hora: "10:00 AM",
      },
      {
        fecha: "2021-04-10",
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Gibrán Posiot",
        hora: "11:00 AM",
      },
      {
        fecha: "2021-04-10",
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Monica Rivera",
        hora: "2:00 PM",
      },
      {
        fecha: "2021-04-11",
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Scarlet Calderón",
        hora: "3:00 PM",
      },
    ],
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
