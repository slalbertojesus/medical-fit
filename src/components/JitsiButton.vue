<template>
  <v-tooltip bottom v-if="!selected">
    <template v-slot:activator="{ on, attrs }">
      <v-icon
        class="mr-2"
        color="white"
        dark
        v-bind="attrs"
        v-on="on"
        @click="iniciarVideollamada"
      >
        mdi-video
      </v-icon>
    </template>
    <span>Iniciar videollamada</span>
  </v-tooltip>
  <div v-else>
    <v-speed-dial v-model="fab">
      <template v-slot:activator>
        <v-icon class="mr-2" v-model="fab" color="white" v-if="fab">
          mdi-close
        </v-icon>
        <v-icon class="mr-3" color="white" v-else>
          mdi-video-minus-outline
        </v-icon>
      </template>
      <v-btn color="green" fab small>
        <ShareNetwork
          network="whatsapp"
          :url="this.link"
          :title="title"
          :description="description"
        >
          <v-icon color="white">mdi-whatsapp</v-icon>
        </ShareNetwork>
      </v-btn>
      <v-btn color="red" fab small>
        <ShareNetwork
          network="email"
          :url="this.link"
          :title="title"
          :description="description"
        >
          <v-icon color="white">mdi-email</v-icon>
        </ShareNetwork>
      </v-btn>
      <v-btn fab dark small color="indigo" @click="copyLink">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
      <v-btn fab dark small color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-speed-dial>
    <v-snackbar v-model="snackbar" :timeout="2000">
      Se ha copiado al portapapeles.
    </v-snackbar>
  </div>
</template>

<script>
export default {
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute("src", "https://meet.jit.si/external_api.js");
    document.head.appendChild(recaptchaScript);
  },
  methods: {
    hashCode(str) {
      var hash = 0,
        i = 0,
        len = str.length;
      while (i < len) {
        hash = ((hash << 5) - hash + str.charCodeAt(i++)) << 0;
      }
      return hash;
    },
    copyLink() {
      var input = document.createElement("input");
      input.setAttribute("value", this.link);
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      this.snackbar = true;
    },
    iniciarVideollamada() {
      this.selected = true;
      let primerNombre = this.name.split(" ")[0];
      const hash = this.hashCode(primerNombre);
      const room = "Cita" + primerNombre + hash;
      const domain = "meet.jit.si";
      const options = {
        roomName: room,
      };
      this.link = "https://" + domain + "/" + options.roomName;
      window.open(this.link, "_blank");
      try {
        window.JitsiMeetExternalAPI(domain, options);
      } catch (err) {
        this.$log.info('Creó instancia de JitsiMeets, no se desplegó, método manda un error por default. IGNORAR', this.err)
      }
    },
  },
  components: {},
  props: {
    name: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    selected: false,
    link: null,
    domain: null,
    fab: null,
    snackbar: false,
    title:
      "Hola, le han invitado a una reunión en JitsiMeets 💊.",
    description: "¡Que tengas un excelente día! ☀️.",
  }),
};
</script>
