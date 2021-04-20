<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Agregar cita </span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Paciente *" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <DatePicker :selectedDate="selectedDate" />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TimePicker />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div v-if="onScreen">
                  <v-text-field
                    v-model="dateLen"
                    label="Duración (Minutos}"
                    type="number"
                    @blur="setDateLen"
                  />
                </div>
              </v-col>
              <v-col cols="12">
                <div v-if="dateOnScreen">
                  <v-text-field
                    v-model="enddate"
                    label="Hora de fin de cita"
                    disabled
                  />
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  background-color="white"
                  label="Comentarios *"
                  counter="600"
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
    dateOnScreen: false,
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
      this.resetVariables();
    },
    setDateLen() {
      if (this.dateLen < 0) {
        this.resetVariables();
      } else {
        var target = moment(this.timeSelected, "h:mm");
        target = target.add(this.dateLen, "m");
        this.enddate = target.format("h:mm");
        this.dateOnScreen = true;
      }
    },
    resetVariables() {
      this.onScreen = false;
      this.enddate = "";
      this.dateLen = "";
      EventBus.$emit("resetVariable");
    },
  },
};
</script>
