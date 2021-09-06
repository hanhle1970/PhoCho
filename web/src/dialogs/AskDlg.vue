<template>
  <v-dialog v-model="show" max-width="600" persistent>
    <v-card>
      <div class="content">
        <div class="promt">Please put reason why you REJECT :</div>
        <div>
          <v-text-field v-model="reason" label="Type reason here" single-line clearable></v-text-field>
        </div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click.stop="onOK">OK</v-btn>
        <v-btn color="green darken-1" text @click.stop="onCancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
         this.$emit('input', value)
      }
    }
  },
  data() {
    return {
      reason: null,
    }
  },
  methods: {
    onOK() {
      if (this.reason != null && this.reason.length > 0) {
        this.$emit("ok", this.reason);
        this.show = false;
      }
      else {
        alert("You must enter reason why reject");
      }
    },

    onCancel() {
      this.show = false;
    }
  }
}
</script>

<style lang="scss">
.content {
  padding: 0 15px;

  .promt {
    color: #ff0000;
    font-size: 16px;
  }
}
</style>
