<template>
  <v-container>
    <small>
      Fecha
    {{selectedDate}}
    </small>
      <EditarCita :visible="EditarCitaModal" @close="EditarCitaModal=false" :selectedDate="selectedDate"  />
      <v-row no-gutters>
      <v-list-item
        class="justify-center"
        v-for="chat in citas"
        :key="chat.title"
      >
        <v-row class="mx-4 ma-2" no-gutters>
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
                <v-list-item-title class="white--text">{{
                  chat.Nombre
                }}</v-list-item-title>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mr-2" color="white" dark v-bind="attrs" v-on="on"
                      @click="EditarCitaModal=true" >
                      mdi-calendar-heart
                    </v-icon>
                  </template>
                  <span>Editar cita</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mr-2" color="white" dark v-bind="attrs" v-on="on">
                      mdi-history
                    </v-icon>
                  </template>
                  <span>Historial médico</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="mr-2" color="white" dark v-bind="attrs" v-on="on">
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

export default {
  mounted() {
  },
  components: {
    EditarCita,
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
  },
  data: () => ({
    EditarCitaModal: false, 
  }),
};
</script>
