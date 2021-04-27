<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="500">
          <v-calendar
            v-model="focus"
            :now="today"
            :value="today"
            color="primary"
            @click:date="displayDialog"
            @click:day="displayCitas"
          >
            <template v-slot:day="{ date }">
              <v-sheet
                class="ma-4"
                v-model="citas"
                v-for="cita in calendario[date]"
                :key="cita.Nombre"
                :title="category[0]"
                color="primary"
                rounded
                height="16"
              >
                <div class="chip-calendar">
                  <v-row align="center" justify="center">
                    <small class="white--text justify-center">
                      {{ cita.Nombre }}
                    </small>
                    <v-icon small class="mx-1" color="white">
                      mdi-calendar
                    </v-icon>
                  </v-row>
                </div>
              </v-sheet>
            </template>
          </v-calendar>
          <v-row>
            <v-col>
              <h3>{{ currentDateTime() }}</h3>
            </v-col>
            <v-col md="1">
              <v-btn fab right dark color="red" @click="displayDialog">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-if="this.citasLista!= 0">
              <h4 class="justify-center">Citas del día</h4>
              <CitasDia />
            </v-col>
            <v-row justify="center" v-else>
              <v-btn x-large outlined color="success" dark>
                Agregar una cita nueva
                <v-icon>
                  mdi-calendar-plus
                </v-icon>
              </v-btn>
            </v-row>
          </v-row>
        </v-sheet>
        <CitasDialogo :selectedDate="selectedDate" :dialog.sync="dialog" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CitasDialogo from "./CitasDialogo.vue";
import CitasDia from "./Citas.vue";
import { EventBus } from "../event-bus";

export default {
  name: "HelloWord",
  components: {
    CitasDialogo,
    CitasDia,
  },
  data: () => ({
    dialog: false,
    citas: null,
    selectedDate: null,
    createEvent: null,
    citasLista: [
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
    calendario: {
      "2021-04-09": [
        { Nombre: "Alberto de Jesús", Problema: "Dolor de gargante" },
        { Nombre: "Marta Karina", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
      ],
      "2021-04-10": [
        { Nombre: "Alberto de Jesús", Problema: "Dolor de gargante" },
        { Nombre: "Marta Karina", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
      ],
      "2021-04-11": [
        { Nombre: "Alberto de Jesús", Problema: "Dolor de gargante" },
        { Nombre: "Marta Karina", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
        { Nombre: "Marta Karina", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
        { Nombre: "Marta Karina", Problema: "Chequeo general" },
        { Nombre: "Berenice Reyes", Problema: "Chequeo general" },
      ],
    },
    colors: ["#1867c0"],
    category: ["Citas"],
    day: "",
    focus: "",
  }),
  mounted() {},
  methods: {
    currentDateTime() {
      const current = new Date();
      const mes = current.toLocaleString("es-MX", { month: "long" });
      const day = current.getDay();
      const año = current.getFullYear();
      const fecha = day + " de " + mes + " del " + año;
      return fecha;
    },
    displayDialog({ date }) {
      this.selectedDate = date;
      this.dialog = true;
    },
    displayCitas({ date }) {
      this.selectedDate = date;
      EventBus.$emit("getCitas", this.selectedDate);
      alert(date);
    },
  },
};
</script>

<style scoped></style>
