<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="paciente"
                  :rules="pacienteRules"
                  label="Paciente *"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <DatePicker :selectedDate="selectedDate" />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <TimePicker v-model="timePicker" :timeInTextField="null" />
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <div v-if="onScreen">
                  <v-text-field
                    v-model="dateLen"
                    :rules="dateLenRules"
                    label="Duración (Minutos}"
                    type="number"
                    @keydown="setDateLen"
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
                  v-model="comentarios"
                  :rules="comentariosRules"
                  background-color="white"
                  label="Comentarios "
                  counter="600"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click.stop="close">Cancelar</v-btn>
          <v-btn rounded :disabled="!valid" color="primary" @click="validate">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import TimePicker from "./TimePicker";
import DatePicker from "./DatePicker";
import { EventBus } from "../event-bus";
import moment from "moment";

export default {
  name: "CitasDialogo",
  mounted() {
    EventBus.$on("updateTime", timeSelected => {
      this.timeSelected = timeSelected;
      this.dateLen = "";
      this.enddate = "";
      this.onScreen = true;
    });
  },
  data: () => ({
    title: null,
    valid: true,
    onScreen: false,
    enddate: null,
    timeInTextfield: "",
    timeSelected: null,
    timePicker: null,
    dateOnScreen: false,
    dateEnd: null,
    paciente: "",
    pacienteRules: [v => !!v || "Debe ingresar un paciente"],
    comentarios: null,
    comentariosRules: [
      v =>
        (v || "").length <= 600 ||
        "Los comentarios deben contener menos de 600 caracteres"
    ],
    dateLen: 0,
    dateLenRules: [
      v => v.length > 0 || "Debe ingresar los minutos de duración",
      v => Number.isInteger(Number(v)) || "Debe ser un entero",
      v => v > 10 || "La duración debe ser mayor a 10 minutos"
    ]
  }),
  components: {
    TimePicker,
    DatePicker
  },
  props: {
    type: null,
    visible: {},
    selectedDate: null,
    selectedHour: null,
    cita: {
      type: Object,
      required: false,
      default: null
    }
  },
  watch: {
    show(visible) {
      if (visible) {
        if (this.type == "EDITAR") {
          this.title = "Editar cita";
          this.dateLen = 0;
          this.dateOnScreen = true;
          this.onScreen = true;
          this.paciente = this.cita.Nombre;
          this.comentarios = this.cita.Problema;
        } else {
          this.title = "Agregar cita";
        }
      }
    }
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    close() {
      this.show = false;
      this.resetVariables();
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    validate() {
      this.$refs.form.validate();
    },
    setDateLen() {
      if (this.dateLen < 0) {
        this.resetVariables();
      } else {
        var target = moment(this.timeSelected, "H:mm");
        target = target.add(this.dateLen, "m");
        this.enddate = target.format("H:mm");
        this.dateOnScreen = true;
      }
    },
    resetVariables() {
      this.dateOnScreen = false;
      this.onScreen = false;
    }
  }
};
</script>
