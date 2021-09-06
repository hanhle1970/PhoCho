<template>
  <div>
    <v-card elevation="0" class="mb-4">
      <div class="px-4 py-4">
        <v-row>
          <v-col cols="12" sm="8">
            <div v-if="groups">
              <v-autocomplete :items="groups" v-model="selGroup" item-text="name" 
                @change="onChangedGroup" label="Group">
              </v-autocomplete>
            </div>
          </v-col>
          <v-col cols="12" sm="4">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Date"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  v-model="dateRangeText"
                ></v-text-field>
              </template>
              <v-date-picker range no-title v-model="dates" @input="menu1 = false"></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <v-card elevation="0" >
      <div class="px-4 py-4">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <div>Total categories: {{ total }} </div>
          </v-col>
          <v-col cols="12" sm="6">
            <v-chip @click="onAdd">Add category</v-chip>
          </v-col>
        </v-row>
      </div>

      <div v-if="items" class="px-4 py-4">
        <v-data-table :headers="headers" :items="items">
          <template v-slot:item.pic="{ item }">
            <div><img :src="getImgUrl(item)" class="pic"></div>
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
      <div v-else>
        <div>Loading...</div>
      </div>
    </v-card>
   
    <CategoryProp v-model="showDlg" :id="selected" :group="selGroup"/>
  </div>
</template>

<script>
import CategoryProp from '../dialogs/CategoryProp.vue'
import Constants from '../contants';

export default {
  components: {
    CategoryProp,
  },

  computed: {
    dateRangeText () {
      return this.dates.join(' ~ ')
    },

    total() {
      return (this.items != null) ? this.items.length : 0;
    }
  },
  data() {
    return {
      groups: null,
      selGroup: null,
      items: null,
      menu1: false,
      dates: [],
      headers: [
        { text: 'Photo', value: 'pic', sortable: false },
        { text: 'Group', value: 'groupName', sortable: false },
        { text: 'Category', value: 'catName', sortable: false },
        { text: 'Desc', value: 'desc', sortable: false },
        { text: 'Order', value: 'priority', sortable: false, width: 150 },
        { text: 'Active', value: 'active', sortable: false },
        { text: 'Created', value: 'createdDate', sortable: false, width: 120 },
        { text: 'Created By', value: 'createdByUser', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      selected: -1,
      showDlg: false,
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      this.$http.get(`api/Util/GetGroupList`, (res) => {
        this.groups = res;
      });

      this.$http.get(`api/Category/GetListByAdmin/6`, (res) => {
        this.items = res;
      })
    },

    getImgUrl(p) {
      return `${Constants.API_SERVICE}/Pic/Categories/${p.groupID}/${p.pic}`;
    },

    onChangedGroup(data) {
      this.$http.get(`api/Category/GetListByAdmin/${data}`, (res) => {
        this.items = res;
      })
    },

    deleteItem(item) {
      console.log(item);
    },

    edit(item) {
      this.selected = item.id;
      this.showDlg = true;
    },

    onAdd() {
      this.selected = 0;
      this.showDlg = true;
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

