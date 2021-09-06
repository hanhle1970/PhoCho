<template>
  <div>
    <v-dialog v-model="show" max-width="500" persistent>
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{ title }}
        </v-card-title>
        <div class="px-4">
          <v-container>
            <div v-if="groups">
              <v-autocomplete v-model="selGroup" label="Group" :items="groups" item-text="name"></v-autocomplete>
            </div>
            <div>
              <v-text-field v-model="name" label="Category name" required></v-text-field>
            </div>
            <div>
              <v-text-field v-model="desc" label="Description"></v-text-field>
            </div>
            <div>
              <v-text-field v-model="priority" label="Order"></v-text-field>
            </div>
            <div class="d-flex">
              <div class="mr-2">
                <img :src="imageUrl" class="pic">
              </div>
              <v-file-input v-model="attachment" label="Picture" accept="image/png, image/jpeg" show-size></v-file-input>
            </div>
          </v-container>

          <v-card-actions>
            <v-checkbox v-model="active" label="Active" dense></v-checkbox>
            <v-spacer></v-spacer>
            <v-btn rounded dark color="info" @click.stop="onOK">OK</v-btn>
            <v-btn color="green darken-1" text @click.stop="show=false">Cancel</v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Constants from '../contants';

export default {
  props: {
    id: Number,
    group: Number,
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
    },

    title() {
      return this.id == 0 ? 'New Category' : 'Edit Category';
    },
    
    imageUrl() {
      console.log(this.selGroup);
      console.log(this.pic);

      if (this.selGroup != null && this.pic != null) {
        return `${Constants.API_SERVICE}/Pic/Categories/${this.selGroup}/${this.pic}`;
      }
      else {
        return require('@/assets/waiting.jpg');
      }
      
    }
  },

  data() {
    return {
      groups: null,
      selGroup: null,
      name: null,
      desc: null,
      pic: null,
      attachment: null,
      priority: 1,
      active: true,
    }
  },

  watch: {
    id: function(newId,) {
      console.log('id changed: ' + newId);

      if (newId != 0) {
        this.$http.get(`api/Category/Get/${newId}`, (res) => {
          this.selGroup = res.groupID,
          this.name = res.catName;
          this.desc = res.desc;
          this.pic = res.pic,
          this.priority = res.priority;
          this.active = res.active;
        });
      }
      else {
        this.pic = null;
      }

      if (this.groups == null) {
        this.$http.get(`api/Util/GetGroupList`, (res) => {
          this.groups = res;
        });
      }
    },

    group: function(newVal,) {
      console.log(newVal);
      this.selGroup = newVal;
    }
  },

  methods: {
    onOK() {
      console.log(this.id);

      const id = (this.id != null) ? this.id : 0;

      if (this.attachment != null) {
        let data = new FormData();
        data.append('file', this.attachment);
        data.append('group', this.selGroup);

        this.$http.upload('api/Category/Upload', data, () => {
          this.save(id);
        })
      }
      else {
        //console.log('Picture is required');
        this.save(id);
      }
    },

    save(id) {
      let p = {
        id: id,
        groupID: this.selGroup,
        catName: this.name,
        desc: this.desc,
        pic: this.attachment,
        priority : this.priority,
        active: this.active,
      };

      console.log(p);

      this.$http.post('api/Category/Save', p, (res) => {
        console.log(res);
      })
    }
  }
}

</script>

<style scoped lang="scss">
.pic {
  width: 70px;
  height: 60px;
  border: 1px solid #aaa;
}
</style>

