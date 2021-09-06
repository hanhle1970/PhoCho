<template>
  <v-dialog v-model="show" max-width="500" persistent>
    <v-card>
      <div v-if="photos">
        <v-carousel
          cycle
          height="250"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(photoUrl, i) in photos" :key="i" :src="photoUrl"></v-carousel-item>
        </v-carousel>
      </div>
      <div v-if="item" class="content">
        <div class="title">{{ item.title }}</div>
        <div class="d-flex">
          <div class="price mr-auto">{{ this.$util.getPriceInWord(item.price) }}</div>
          <div class="timeloc"><i class="bi-stopwatch" /> {{ this.$util.getDuration(item.createdDate) }} - {{ item.city }}</div>
        </div>
        <div class="desc">{{ item.desc }}</div>
      </div>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click.stop="show=false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Constants from '../contants';

export default {
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
    }
  },
  mounted() {
    console.log('hello');
    //this.dialog = true;
  }
}
</script>

<style lang="scss">
.content {
  padding: 10px 20px;

  .title {
    font-weight: 600;
  }
  .price {
    color: #ff0000;
    font-size: 12px;
  }
  .timeloc {
    color: #555;
  }
  .desc {
    margin-top: 10px;
    white-space: pre-line;
  }
}
</style>
