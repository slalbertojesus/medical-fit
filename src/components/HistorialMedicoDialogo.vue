<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <small> </small>
      <v-card-title v-model="titulo" class="headline">
        Historial Médico
      </v-card-title>
      <v-list-item v-if="!cita">Cargando...</v-list-item>
      <v-list-item v-else v-text="cita.Problema"></v-list-item>
       <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click.stop="close">
          Salir
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  setup() {},
  props: {
    cita: {
      type: Object,
      required: false,
      default: null,
      Problema: {},
      Nombre: {
        type: String,
        default: null,
        required: false,
      },
    },
    visible: {},
  },
  data: () => ({
    titulo: null,
  }),
  watch: {},
  methods: {
    close() {
      this.show = false;
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
};
</script>
