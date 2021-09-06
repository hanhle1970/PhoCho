<template>
  <dlg-wrapper ref="dlg" title="Group Prop">
    <div>
      <div>
        <v-text-field v-model="name" label="Group name" required></v-text-field>
      </div>
      <div>
        <v-text-field v-model="desc" label="Description"></v-text-field>
      </div>
      <div class="d-flex">
        <div class="mr-2">
          <img :src="imageUrl" class="pic">
        </div>
        <v-file-input v-model="attachment" label="Picture" accept="image/png, image/jpeg" show-size></v-file-input>
      </div>
      <div>
        <v-checkbox v-model="active" label="Active" dense></v-checkbox>
      </div>
    </div>
  </dlg-wrapper>
</template>

<script>
import DlgWrapper from "../dialogs/DlgWrapper.vue";
import Constants from '../contants';

export default {
  components: {
    DlgWrapper,
  },

  data() {
    return {
      name: null,
      desc: null,
      pic: null,
      attachment: null,
      active: true,
    }
  },

  computed: {
    imageUrl() {
      if (this.pic != null) {
        return `${Constants.API_SERVICE}/Pic/Groups/${this.pic}`;
      }
      else {
        return require('@/assets/waiting.jpg');
      }
    }
  },

  methods: {
    show: function(id) {
      if (id != 0) {
        this.load(id);
      }
      else {
        this.name = null;
        this.desc = null;
        this.pic = null,
        this.active = false;
      }

      this.$refs.dlg.open().then(res => {
        console.log("Result:", res);
      });
    },

    load(id) {
      this.$http.get(`api/Group/Get/${id}`, (res) => {
        this.name = res.groupName;
        this.desc = res.desc;
        this.pic = res.pic,
        this.active = res.active;
      });
    }
  },
}
</script>

<style scoped lang="scss">
.pic {
  width: 70px;
  height: 60px;
  border: 1px solid #aaa;
  padding: 5px;
}
</style>

