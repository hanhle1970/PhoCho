<template>
    <div v-if="items">
      <v-card elevation="0" >
        <div class="px-4 pb-4">
          <v-data-table :headers="headers" :items="items" @click:row="onClickRow">
            <template v-slot:item.pic="{ item }">
              <div>{{item.pic}}</div>
            </template>
            <template v-slot:item.price="{ item }">
              <div>{{ getPriceInWord(item.price) }}</div>
            </template>
            <template v-slot:item.createdDate="{ item }">
              <div>{{item.createdDate | moment("MMM DD, YYYY")}}</div>
            </template>
          </v-data-table>
        </div>
      </v-card>
      <PreviewItemDlg v-model="showDlg" :id="selected"/>
    </div>
</template>

<script>
import PreviewItemDlg from '../pages/PreviewItemDlg.vue'
import Constants from '../contants';

export default {
  name: 'ApprovedListPage',
  components: {
    PreviewItemDlg
  },
  data() {
    return {
      selected: 0,
      showDlg: false,
      items: null,
      headers: [
        { text: 'Photo', value: 'pic', sortable: false },
        { text: 'Category', value: 'categoryID', sortable: false },
        { text: 'Title', value: 'title', sortable: false },
        { text: 'Price', value: 'price', sortable: false, width: 150 },
        { text: 'Created', value: 'createdDate', sortable: false, width: 120 },
      ]
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$http.get(`api/Admin/GetApprovedList/0/20`, (res) => {
        this.items = res;
      })
    },

    getPriceInWord(price) {
      return this.$util.getPriceInWord(price);
    },

    //onImgError(event) {
      //event.target.src = '/Images/Personal/non-author.png';
    //},

    getImgUrl(p) {
      return `${Constants.API_SERVICE}/Pic/Items/${p.categoryID}/${p.pic}`;
    },

    onClickRow(item, ) {
      this.selected = item.id;
      this.showDlg = true;
      //this.$router.push({ path: "/previewitem" })
    },
  }
}
</script>

<style scoped lang="scss">
.photo {
  width: 60px;
  height: 60px;
}
</style>