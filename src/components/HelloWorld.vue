<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="500">
          <v-calendar
            v-model="focus"
            color="primary"
            @click:date="displayDialog"
            @click:day="currentSelectedDate"
          >
            <template v-slot:day="{ date }">
              <div v-for="(cita, index) in calendario[date]" :key="cita.Nombre">
                <v-chip
                  id="chip"
                  v-if="index < 2"
                  v-model="citas"
                  :title="category[0]"
                  color="primary"
                  rounded
                >
                  <div v-if="index == 0">
                    <small class="white--text justify-center">
                      {{ cita.Nombre }}
                    </small>
                    <v-icon small class="mx-1" color="white">
                      mdi-calendar
                    </v-icon>
                  </div>
                  <div v-else-if="index == 1">
                    <small class="white--text justify-center">
                      {{ arrayNumber(date) }} citas más
                    </small>
                  </div>
                </v-chip>
              </div>
            </template>
          </v-calendar>
          <v-row>
            <v-col>
              <h3 class="mt-3">{{ calendarDate }}</h3>
            </v-col>
            <v-col class="text-right">
              <v-btn
                v-if="this.citasLista != 0"
                fab
                right
                dark
                color="red"
                @click="displayDialog"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-spacer></v-spacer>
          <v-row>
            <v-col v-if="this.citasLista != 0">
              <h4 class="justify-center">Citas del día</h4>
              <CitasDia />
            </v-col>
            <v-row class="mt-2" justify="center" v-else>
              <v-btn
                x-large
                outlined
                color="success"
                dark
                @click="displayDialog"
              >
                 No existen citas registradas el día de hoy, agrega una cita nueva!
                <v-icon class="mx-2">
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
    calendarDate: null, 
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
      "2021-04-03": [
        { Nombre: "Alberto de Jesús", Problema: "Dolor de gargante" },
      ],
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
  mounted() {
    this.calendarDate = this.currentDateTime(); 
    EventBus.$emit("getCitas", this.selectedDate);
  },
  methods: {
    arrayNumber(date) {
      return this.calendario[date].length - 1;
    },
    convertDate(date){
      var current = new Date();
      if (date != null){
      date = date + "T00:00:00";
      current = new Date(date);
      }
      const day = current.getDate();
      const mes = current.toLocaleString("es-MX", { month: "long" });
      const año = current.getFullYear();
      const fecha = day + " de " + mes + " del " + año;
      return fecha;
    },
    currentSelectedDate({date}){
      this.calendarDate = this.convertDate(date);
    },
    currentDateTime() {
      const fecha = this.convertDate();
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

<style scoped>
#chip {
  height: 20px;
}
</style>
