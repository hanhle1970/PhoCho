<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      :width="options.width"
      v-bind:style="{ zIndex: options.zIndex }"
    >
      <v-card>
        <v-card-title class="grey lighten-2 px-4" v-show="!!title">{{ title }}</v-card-title>
        <div class="px-4">
          <slot></slot>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn rounded dark color="info" @click="agree">OK</v-btn>
            <v-btn color="green darken-1" text @click="cancel">Cancel</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
//https://stackoverflow.com/questions/56026220/how-to-programmatically-launch-a-vuetify-dialog-and-wait-for-the-response/57937480#57937480

export default {
  name: "dlg-wrapper",
  //inject: ["agree", "cancel"],

  props: {
    title: String,
  },

  data: () => ({
    dialog: false,
    options: {
      width: 400,
      zIndex: 200
    },
    resolve: null,
    reject: null
  }),

  methods: {
    open(options) {
      this.dialog = true;
      this.options = Object.assign(this.options, options);

      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },

    agree() {
      this.resolve(true);
      this.dialog = false;
    },

    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  },

  //provide: function() {
  //  return { agree: this.agree, cancel: this.cancel };
  //}
}
</script>
