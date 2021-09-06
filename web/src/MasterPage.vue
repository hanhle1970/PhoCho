<template>
  <div>
    <SidebarMenu :menu="menu" width="260px" @toggle-collapse="onToggleCollapse" @item-click="onMenuClick" >
      <div slot="header" class="header">
        <div class="d-flex">
          <div>
            <v-avatar size='48'>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
          </div>
          <div class="profile">
            <div class="mb-1">{{userName}}</div>
            <div class="mb-1">{{userRole}}</div>
          </div>
        </div>
      </div>
      <div slot="footer">footer</div>
      <span slot="toggle-icon">
        <i class="fa fa-caret-square-o-down"></i>
      </span>
      <span slot="dropdown-icon">
        <i class="fa fa-angle-right"></i>
      </span>
    </SidebarMenu>

    <div id="demo" :class="[{'collapsed': collapsed}]">
      <MainBar />
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { SidebarMenu } from 'vue-sidebar-menu'
import '@/assets/sidebar-custom-theme.scss'
import MainBar from './components/MainBar'

export default {
  components: {
    SidebarMenu,
    MainBar,
  },
  data() {
    return {
      collapsed: false,
      menu: [
        {
          header: true,
          title: 'Main Navigation',
          hiddenOnCollapse: true
        },
        {
          href: '/',
          title: 'Dashboard',
          icon: 'fa fa-user'
        },
        {
          //href: '/system',
          title: 'System',
          icon: 'fa fa-user',
          child: [
            {
              href: '/system/groups',
              title: 'Groups',
              icon: 'fa fa-user',
            },
            {
              href: '/system/categories',
              title: 'Categories',
              icon: 'fa fa-user',
            },
            {
              href: '/system/users',
              title: 'Users',
              icon: 'fa fa-user',
            }
          ]
        },
        {
          href: '/waitinglist',
          title: 'Waiting for approve',
          icon: 'bi-stopwatch'
        },
        {
          href: '/approvedlist',
          title: 'Approved items',
          icon: 'fa fa-anchor'
        },
        {
          href: '/rejectedlist',
          title: 'Rejected items',
          icon: 'bi-github'
        },
      ]
    }
  },
  computed: {
    userName() {
      return this.$authen.user.fullName;
    },

    userRole() {
      return this.$authen.user.roleName;
    },
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed;
    },

    onMenuClick(_, item, ) {
      if (item.child == null || item.child == undefined) {
        var paths = [];
        this.findNode(item, this.menu, paths);
        this.$store.dispatch('paths', paths);
      }
    },

    findNode(node, menu, paths) {
      for (const p of menu) {
        if (p.child != null) {
          const res = this.findNode(node, p.child, paths);
          if (res == true) {
            paths.unshift(p.title);
            return true;
          }
        }
        else if (node == p) {
          paths.unshift(p.title);
          return true;
        }
      }

      return false;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Segoe UI, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  //text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}

#demo {
  padding-left: 260px;
  transition: 0.3s ease;

  .main {
    padding: 15px 15px;
  }
}

#demo.collapsed {
  padding-left: 65px;
}

.header {
  padding: 15px 10px 10px 10px;
}
.profile {
  padding-left: 10px;
  color: #ddd;
}
</style>
