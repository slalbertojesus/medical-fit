<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card>
        <v-card-title>
          <span class="headline">Agregar cita </span>
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
          <v-btn color="red darken-1" text @click.stop="close"
            >Cancelar</v-btn
          >
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
import moment from "moment";

export default {
  name: "CitasDialogo",
  data: () => ({
    type: null,
    valid: true,
    onScreen: false,
    enddate: null,
    timeInTextfield: "",
    timeSelected: null,
    dateOnScreen: false,
    dateEnd: null,
    paciente: "",
    pacienteRules: [(v) => !!v || "Debe ingresar un paciente"],
    comentarios: null,
    comentariosRules: [
      (v) =>
        (v || "").length <= 600 ||
        "Los comentarios deben contener menos de 600 caracteres",
    ],
    dateLen: null,
    dateLenRules: [
      (v) => v.length > 0 || "Debe ingresar los minutos de duración",
      (v) => Number.isInteger(Number(v)) || "Debe ser un entero",
      (v) => v > 10 || "La duración debe ser mayor a 10 minutos",
    ],
  }),
  components: {
    TimePicker,
    DatePicker,
  },
  props: {
    visible: {},
    selectedDate: null,
    selectedHour: null,
    dialog: {
      default: false,
    },
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
      },
    },
  },
  methods: {
    close() {
      this.show = false;
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
  },
};
</script>
