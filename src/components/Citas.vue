<template>
  <v-container>
    <EditarCita
      :visible="EditarCitaModal"
      @close="EditarCitaModal = false"
      :cita="citas[id]"
      :type="type"
      :selectedDate="selectedDate"
    />
    <Historial :cita="citas[id]" :visible="HistorialModal" @close="HistorialModal = false" />
    <v-row no-gutters>
      <h4 class="justify-center">Citas del día</h4>
      <v-list-item
        class="justify-center"
        v-for="(chat, index) in citas"
        :key="chat.title"
      >
        <v-row class="mx-4 ma-2" align="center" no-gutters>
          <v-col cols="3" md="2">
            <small>{{ chat.hora }}</small>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <v-card ripple color="primary">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    :alt="`${chat.Nombre} avatar`"
                    :src="chat.avatar"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-title class="white--text">
                  {{ responsiveName(chat.Nombre) }}
                </v-list-item-title>
                <JitsiButton
                  v-if="displayJitsiMeets(selectedDate)"
                  :name="chat.Nombre"
                />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="mr-2"
                      color="white"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="openDialog(index)"
                    >
                      mdi-calendar-heart
                    </v-icon>
                  </template>
                  <span>Editar cita</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="mr-2"
                      color="white"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="openHistory(index)"
                    >
                      mdi-history
                    </v-icon>
                  </template>
                  <span>Historial médico</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      class="mr-2"
                      color="white"
                      dark
                      v-bind="attrs"
                      v-on="on"
                    >
                      mdi-trash-can-outline
                    </v-icon>
                  </template>
                  <span>Eliminar cita</span>
                </v-tooltip>
              </v-list-item>
            </v-card>
          </v-col>
        </v-row>
      </v-list-item>
    </v-row>
  </v-container>
</template>

<script>
import EditarCita from "./CitasDialogo";
import JitsiButton from "./JitsiButton";
import Historial from "./HistorialMedicoDialogo";

export default {
  mounted() {},
  components: {
    EditarCita,
    JitsiButton,
    Historial,
  },
  props: {
    citas: {
      type: Array[String],
      required: true,
      default: [],
    },
    selectedDate: null,
  },
  methods: {
    responsiveName(name) {
      if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) {
        let firstWord = name.split(" ")[0];
        return firstWord;
      }
      return name;
    },
    displayJitsiMeets(selectedDate) {
      selectedDate = selectedDate + "T00:00:00";
      var date = new Date(selectedDate);
      const today = new Date();
      return (
        date.getDate() == today.getDate() &&
        date.getMonth() == today.getMonth() &&
        date.getFullYear() == today.getFullYear()
      );
    },
    openDialog(id) {
      this.id = id;
      this.EditarCitaModal = true;
    },
    openHistory(id) {
      this.id =id;
      this.HistorialModal = true;
    },
  },
  data: () => ({
    id: null,
    type: "EDITAR",
    HistorialModal: false,
    EditarCitaModal: false,
  }),
};
</script>

<style scoped></style>
