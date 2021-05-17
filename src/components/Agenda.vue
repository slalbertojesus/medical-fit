<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="550">
          <v-calendar
            v-model="focus"
            ref="calendar"
            color="primary"
            :now="daySelected"
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
            <h3 class="mt-3">{{ calendarDate }}</h3>
            <v-col
              v-if="this.calendario[selectedDate] != null"
              class="text-right"
            >
              <v-btn fab right dark color="red" @click="EditarCitaModal = true">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="this.calendario[selectedDate] != null">
            <CitasDia
              :citas="calendario[selectedDate]"
              :selectedDate="selectedDate"
            />
          </v-row>
          <v-container class="ma-5" v-else>
            <v-row justify="center">
              <v-col cols="12" sm="4">
                <p class="my-2 font-weight-black text-no-wrap">
                  No se encontró ninguna cita registrada.
                </p>
                <v-btn
                  class="my-2"
                  x-large
                  outlined
                  color="success"
                  dark
                  @click="EditarCitaModal = true"
                >
                  Agrega una cita nueva!
                  <v-icon class="mx-2">
                    mdi-calendar-plus
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
        <CitasDialogo
          :visible="EditarCitaModal"
          @close="EditarCitaModal = false"
          :selectedDate="selectedDate"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CitasDialogo from "./CitasDialogo.vue";
import CitasDia from "./Citas.vue";

export default {
  name: "HelloWord",
  components: {
    CitasDialogo,
    CitasDia,
  },
  data: () => ({
    daySelected: null,
    citas: null,
    calendarDate: null,
    selectedDate: null,
    createEvent: null,
    EditarCitaModal: false,
    calendario: {
      "2021-05-12": [
        {
          id: 16,
          Nombre: "Joe Custoe",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
        {
          id: 17,
          Nombre: "Nasin Taleb",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
      ],
      "2021-05-17": [
        {
          id: 19,
          Nombre: "Yes Custoe",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
        {
          id: 18,
          Nombre: "Obama Taleb",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
      ],
    },
    colors: ["#1867c0"],
    category: ["Citas"],
    day: "",
    today: new Date().toISOString().substr(0, 10),
    focus: "",
  }),
  mounted() {
    this.selectedDate = this.today;
    this.calendarDate = this.currentDate();
  },
  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    arrayNumber(date) {
      return this.calendario[date].length - 1;
    },
    convertDate(date) {
      var current = new Date();
      if (date != null) {
        date = date + "T00:00:00";
        current = new Date(date);
      }
      const day = current.getDate();
      const mes = current.toLocaleString("es-MX", { month: "long" });
      const año = current.getFullYear();
      const fecha = day + " de " + mes + " del " + año;
      return fecha;
    },
    currentSelectedDate({ date }) {
      this.daySelected = date;
      this.selectedDate = date;
      this.calendarDate = this.convertDate(date);
    },
    currentDate() {
      const fecha = this.convertDate();
      return fecha;
    },
    displayDialog({ date }) {
      this.selectedDate = date;
      this.EditarCitaModal = true;
    },
  },
};
</script>

<style scoped>
#chip {
  height: 20px;
  display: flex;
  justify-content: center;
  margin-top: 1px;
  margin-bottom: 2px;
}
</style>
