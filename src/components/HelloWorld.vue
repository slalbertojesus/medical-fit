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
          <v-col class="text-right">
            <v-btn
              class="mx-2"
              fab
              dark
              right
              color="red"
              @click="displayDialog"
            >
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-sheet>
        <CitasDialogo :selectedDate="selectedDate" :dialog.sync="dialog" />
      </v-col>
    </v-row>
    <v-row>
      <CitasDia />
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
    today: new Date().toISOString().slice(0, 10),
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
    displayDialog({ date }) {
      this.selectedDate = date;
      this.dialog = true;
    },
    displayCitas({ date }) {
      this.selectedDate = date;
      EventBus.$emit("getCitas", this.selectedDate)
      alert(date)
    },
  },

};
</script>

<style scoped></style>
