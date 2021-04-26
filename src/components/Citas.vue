<template>
  <v-container>
    <v-row no-gutters>
      <v-header v-model="header">{{ selectedDate }}</v-header>
      <v-subheader>Citas del día</v-subheader>
      <v-list-item
        class="align-left justify-center"
        v-for="chat in recent"
        :key="chat.title"
      >
        <subtitle-1 v-text="chat.hora"></subtitle-1>
        <v-card rounded class="ma-1" color="primary">
          <v-card-actions>
            <v-list-item>
              <v-list-item-avatar>
                <v-img :alt="`${chat.title} avatar`" :src="chat.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-title class="mr-1 white--text">{{
                chat.title
              }}</v-list-item-title>
              <v-icon color="white" class="mr-1">
                mdi-pencil
              </v-icon>
              <v-icon color="white" class="mr-1">
                mdi-history
              </v-icon>
              <v-icon color="white" class="mr-1">
                mdi-trash-can-outline
              </v-icon>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-list-item>
    </v-row>
  </v-container>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  mounted() {
    EventBus.$on("getCitas", (selectedDate) => {
      this.selectedDate= selectedDate;
      this.header= selectedDate;
    });
  },
  data: () => ({
    selectedDate: null,
    citas: [
      {
        avatar_paciente: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        nombre: "Miguel Hernández",
        historial_medico: [
          {
            fecha: "2019-01-09",
            descripcion: "Dolor de espalda",
          },
          {
            fecha: "2019-02-13",
            descripcion: "Dolor de gargante",
          },
        ],
        hora: "10:00 AM",
      },
      {
        avatar_paciente: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        nombre: "Gibrán Posiot",
        historial_medico: [
          {
            fecha: "2019-01-09",
            descripcion: "Dolor de espalda",
          },
          {
            fecha: "2019-02-13",
            descripcion: "Dolor de gargante",
          },
        ],
        hora: "11:00 AM",
      },
      {
        avatar_paciente: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        nombre: "Monica Rivera",
        historial_medico: [
          {
            fecha: "2019-01-09",
            descripcion: "Dolor de espalda",
          },
          {
            fecha: "2019-02-13",
            descripcion: "Dolor de gargante",
          },
        ],
        hora: "2:00 PM",
      },
      {
        avatar_paciente: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        nombre: "Scarlet Calderón",
        historial_medico: [
          {
            fecha: "2019-01-09",
            descripcion: "Dolor de espalda",
          },
          {
            fecha: "2019-02-13",
            descripcion: "Dolor de gargante",
          },
        ],
        hora: "3:00 PM",
      },
    ],
    recent: [
      {
        active: true,
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Miguel Hernández",
        hora: "10:00 AM",
      },
      {
        active: true,
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Gibrán Posiot",
        hora: "11:00 AM",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Monica Rivera",
        hora: "2:00 PM",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Scarlet Calderón",
        hora: "3:00 PM",
      },
    ],
    previous: [
      {
        title: "Travis Howard",
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
      },
    ],
    today: "2019-01-10",
    tracked: {
      "2019-01-09": [23, 45, 0],
      "2019-01-07": [0, 78, 0],
      "2019-01-06": [0, 0, 0],
      "2019-01-05": [0, 10, 0],
      "2019-01-04": [0, 30],
      "2019-01-03": [10, 32],
      "2019-01-02": [80, 10, 0],
      "2019-01-01": [20, 25, 0],
    },
    colors: ["#1867c0", "#fb8c00"],
    category: ["Citas", "Reuniones"],
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
