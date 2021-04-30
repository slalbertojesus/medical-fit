<template>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="500">
          <v-calendar
            v-model="focus"
            color="primary"
            :now='daySelected'
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
                v-if="this.calendario[selectedDate] != null"
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
            <v-col v-if="calendario[selectedDate] != null">
              <h4 class="justify-center">Citas del día</h4>
              <CitasDia :citas="calendario[selectedDate]" />
            </v-col>
            <v-row class="mt-2" justify="center" v-else>
              <v-btn
                x-large
                outlined
                color="success"
                dark
                @click="displayDialog"
              >
                Agrega una cita
                nueva!
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

export default {
  name: "HelloWord",
  components: {
    CitasDialogo,
    CitasDia,
  },
  data: () => ({
    dialog: false,
    index: null, 
    daySelected: null,
    citas: null,
    calendarDate: null,
    selectedDate: null,
    createEvent: null,
    calendario: {
      "2021-04-04": [
        {
          Nombre: "Gibran Posiot",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          hora: "11:00 AM",
          Problema: "Dolor de gargante",
        },
        {
          Nombre: "Gibran Posiot",
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          hora: "11:00 AM",
          Problema: "Dolor de gargante",
        },
      ],
      "2021-04-09": [
        {
          Nombre: "Alberto de Jesús",
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          hora: "10:00 AM",
          Problema: "Dolor de gargante",
        },
        {
          Nombre: "Monica Rivera",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
      ],
      "2021-04-10": [
        {
          Nombre: "Berenice Reyes",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
      ],
      "2021-04-11": [
        {
          Nombre: "Berenice Reyes",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
        {
          Nombre: "Berenice Reyes",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
      ],
      "2021-04-29": [
        {
          Nombre: "Berenice Reyes",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
        {
          Nombre: "Berenice Reyes",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
      ],
      "2021-04-30": [
        {
          Nombre: "Berenice Reyes",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
        {
          Nombre: "Berenice Reyes",
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          hora: "2:00 PM",
          Problema: "Dolor de gargante",
        },
      ]
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
      this.dialog = true;
    },
  },
};
</script>

<style scoped>
#chip {
  height: 20px;
}
</style>
