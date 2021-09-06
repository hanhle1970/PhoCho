<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <div class="px-4 py-4">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <div>Total groups: {{ total }} </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-chip @click="onAdd">Add group</v-chip>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <div v-if="items">
      <v-card elevation="0" >
        <div class="px-4 pb-4">
          <v-data-table :headers="headers" :items="items">
            <template v-slot:item.pic="{ item }">
              <div><img :src="getImgUrl(item)" class="pic"></div>
            </template>
            <template v-slot:item.onHome="{ item }">
              <div>{{ item.onHome }}</div>
            </template>
            <template v-slot:item.active="{ item }">
              <div>{{ item.active }}</div>
            </template>
            <template v-slot:item.createdDate="{ item }">
              <div>{{item.createdDate | moment("MMM DD, YYYY")}}</div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="edit(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </div>
      </v-card>
      <GroupProp ref="dlg" ></GroupProp>
    </div>
    <div v-else>
      <div>Loading...</div>
    </div>
  </div>
</template>

<script>
import GroupProp from '../dialogs/GroupProp.vue';
import Constants from '../contants';

export default {
  components: {
    GroupProp,
  },

  data() {
    return {
      total: 0,
      items: null,
      headers: [
        { text: 'Photo', value: 'pic', sortable: false },
        { text: 'Name', value: 'groupName', sortable: false },
        { text: 'Desc', value: 'desc', sortable: false },
        { text: 'On Home', value: 'onHome', sortable: false, width: 150 },
        { text: 'Active', value: 'active', sortable: false },
        { text: 'Created', value: 'createdDate', sortable: false, width: 120 },
        { text: 'Created By', value: 'createdByUser', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ]
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$http.get(`api/Group/GetListByAdmin`, (res) => {
        this.items = res;
      })
    },

    getImgUrl(p) {
      return `${Constants.API_SERVICE}/Pic/Groups/${p.pic}`;
    },

    deleteItem(item) {
      console.log(item);
    },

    edit(item) {
      this.$refs.dlg.show(item.id);
    },

    onAdd() {
      this.$refs.dlg.show(0);
    },
  }
}
</script>

<style scoped lang="scss">
.pic {
  width: 50px;
  height: 50px;
  padding: 5px 0;
}
</style>

