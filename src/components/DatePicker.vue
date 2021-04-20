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
        <v-col cols="12" >
          <v-text-field
            label="Fecha de cita *"
            readonly
            :value="fromDateDisp"
            v-on="on"
          ></v-text-field>
        </v-col>
      </template>
      <v-date-picker
        locale="en-in"
        :min="minDate"
        :max="maxDate"
        v-model="fromDateVal"
        no-title
        @input="fromDateMenu = false"
      ></v-date-picker>
    </v-menu>
  </v-layout>
</template>

<script>
import { EventBus } from "../event-bus";

export default {
  name: "DatePicker",
  mounted() {
    EventBus.$on("resetVariable", () => {
      this.fromDateVal = null;
    });
  },
  data: () => ({
    on: undefined,
    fromDateMenu: false,
    fromDateVal: null,
    minDate: "2019-07-04",
    maxDate: "2023-08-30",
  }),
  components: {},
  methods: {
    formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
  },
  props: {
    selectedDate: null,
  },
  computed: {
    fromDateDisp() {
      if (this.fromDateVal == null) {
        return this.formatDate(this.selectedDate);
      }
      return this.formatDate(this.fromDateVal);
    },
  },
};
</script>
