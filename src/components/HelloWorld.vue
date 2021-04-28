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
            <template v-slot:day="{ date }"
             v-if="calendario.length > 1">
              <v-chip
                v-model="citas"
                v-for="cita in calendario[date]"
                :key="cita.Nombre"
                :title="category[0]"
                color="primary"
                rounded
              >
                <small class="white--text justify-center">
                  {{ cita.Nombre }}
                </small>
                <v-icon small class="mx-1" color="white">
                  mdi-calendar
                </v-icon>
              </v-chip>
            </template>
          </v-calendar>
          <v-row>
            <v-col>
              <h3 class="mt-3">{{ currentDateTime() }}</h3>
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
                Agregar una cita nueva
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
    selectedDate: null,
    createEvent: null,
    citasLista: [],
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
