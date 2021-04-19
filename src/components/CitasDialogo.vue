<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline"
            >Agregar cita
          </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <DatePicker :selectedDate="selectedDate" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <small>* Paciente</small>
                <v-text-field required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <TimePicker />
              </v-col>
              <div v-if="onScreen">
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="dateLen"
                    label="Duración (Minutos}"
                    hide-details
                    single-line
                    type="number"
                    @blur="setDateLen"
                  />
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="enddate"
                    label="Hora de fin de cita"
                    hide-details
                    single-line
                    disabled
                  />
                </v-col>
              </div>
              <v-col cols="12" sm="6" md="4">
                <small>* Comentarios</small>
                <v-textarea
                  background-color="white"
                  color="black"
                  columns="12"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            text
            @click.native="close"
            @click="resetVariables"
            >Cancelar</v-btn
          >
          <v-btn rounded color="primary" @click="dialog = false">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import moment from "moment";
import { EventBus } from "../event-bus";

export default {
  name: "CitasDialogo",
  mounted() {
    EventBus.$on("updateTime", (timeSelected) => {
      this.timeSelected = timeSelected;
      this.dateLen = "";
      this.enddate = "";
      this.onScreen = true; 
    });
  },
  data: () => ({
    onScreen: false, 
    enddate: null,
    timeSelected: null,
    dateLen: null,
    dateEnd: null,
    today: "",
    time: "",
    picker: "",
  }),
  components: {
    TimePicker,
    DatePicker,
  },
  props: {
    selectedDate: null,
    selectedHour: null,
    dialog: {
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("update:dialog", false);
    },
    setDateLen() {
      if (this.dateLen < 0) {
        this.dateLen = "";
        this.enddate = "";
      } else {
        var target = moment(this.timeSelected, "h:mm");
        target = target.add(this.dateLen, "m");
        this.enddate = target.format("h:mm");
      }
    },
    resetVariables() {
      this.dateLen = "";
      EventBus.$emit("resetVariable");
    },
  },
};
</script>
