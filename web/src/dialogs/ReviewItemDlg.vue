<template>
  <div>
    <v-dialog v-model="show" max-width="500" persistent>
      <v-card>
        <v-tabs>
          <v-tab>General</v-tab>
          <v-tab>Photo{{ getPhotoCount() }}</v-tab>
          <v-tab>Map</v-tab>
          <v-tab-item>
            <v-container fluid class="content" v-if="item">
              <div class="title">{{ item.title }}</div>
              <div class="d-flex">
                <div class="price mr-auto">{{ this.$util.getPriceInWord(item.price) }}</div>
                <div class="timeloc"><i class="bi-stopwatch" /> {{ this.$util.getDuration(item.createdDate) }} - {{ item.city }}</div>
              </div>
              <div class="desc">{{ item.desc }}</div>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container fluid v-if="photos">
              <v-row>
                <v-col v-for="(p, index) in photos" :key="index" cols="12" md="3">
                  <v-img :src="p" aspect-ratio="1"></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item>
          </v-tab-item>
        </v-tabs>

        <v-card-actions>
          <v-btn rounded dark color="primary" @click.stop="approve"> Approve </v-btn>
          <v-btn rounded dark color="error" @click.stop="reject">Reject</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click.stop="show=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <AskDlg v-model="showAsk" @ok="onAccept2Reject"></AskDlg>
  </div>
</template>

<script>
import AskDlg from '../dialogs/AskDlg.vue';
import Constants from '../contants';

export default {
  components: {
    AskDlg,
  },
  props: {
    id: Number,
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
  watch: {
    id: function(newId,) {
      this.$http.get(`api/Item/Get/${newId}/0`, (res) => {
        //console.log(res);
        this.item = res;

        this.$http.get(`api/Picture/GetList/${newId}`, (res) => {
          this.photos = res.map(p => {
            return `${Constants.API_SERVICE}/Pic/Items/${this.item.categoryID}/${p.fileName}`;
          });
        })
      });
    }
  },
  data() {
    return {
      item: null,
      photos: null,
      showAsk: false,
    }
  },
  mounted() {
    //this.dialog = true;
  },
  methods: {
    getPhotoCount() {
      return (this.photos != null) ? `(${this.photos.length})` : "";
    },

    approve() {
    },
    
    reject() {
      this.showAsk = true;
      //this.$emit("reject");
    },

    onAccept2Reject(reason) {
      console.log(reason);
      var data = {
        itemID: this.item.id,
        reason: reason,
      };

      this.$http.post(`api/Admin/Reject`, data, () => {
        this.show = false;
      });
    },
  }
}
</script>

<style lang="scss">
.content {
  padding: 10px 20px;

  .title {
      font-size: 13px;
  }
  .price {
    color: #ff0000;
    font-size: 12px;
  }
  .timeloc {
    color: #555;
    font-size: 12px;
  }
  .desc {
    margin-top: 10px;
    white-space: pre-line;
  }
}
</style>
