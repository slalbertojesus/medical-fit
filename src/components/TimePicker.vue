<template>
  <v-layout row wrap>
    <v-menu
      v-model="fromDateMenu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-col>
          <v-text-field
            v-model="timeField"
            label="Hora de inicio *"
            readonly
            :rules="timeFieldRules"
            v-on="on"
            @click="onScreen = true"
          >
          </v-text-field>
        </v-col>
      </template>
      <div v-if="onScreen">
        <v-time-picker
          v-model="timeStep"
          format="24hr"
          @click:minute="triggerTextField"
        ></v-time-picker>
      </div>
    </v-menu>
  </v-layout>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  name: "TimePicker",
  mounted() {
    this.timeStep = null;
    this.onScreen = false;
  },
  data: () => ({
    on: undefined,
    onScreen: false,
    timeStep: null,
    timeField: "",
    timeSelected: null,
    fromHourDisp: null,
    fromDateMenu: false,
    timeFieldRules: [(v) => !!v || "Debe ingresar la hora de inicio"],
  }),
  components: {},
  props: {
    timeInTextField: {
      type: String,
      default: "",
    },
  },
  computed: {
    setTime() {
      return this.timeInTextField;
    },
  },
  methods: {
    triggerTextField() {
      this.timeField = this.timeStep;
      this.onScreen = false;
      EventBus.$emit("updateTime", this.timeStep);
    },
  },
};
</script>

<style scoped></style>
