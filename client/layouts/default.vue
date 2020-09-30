<template>
  <div>
    <a-layout id="component-layout">
      <a-layout-sider
        v-if="isAuthenticated"
        v-model="collapsed"
        :trigger="null"
        collapsible
        breakpoint="lg"
        collapsed-width="0"
      >
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :default-selected-keys="['0']">
          <a-menu-item
            :key="item.index"
            v-for="(item, index) in routes"
            @click="$router.push(item.route, () => {})"
          >
            <a-icon :type="item.icon" />
            <span>{{ item.name }}</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :class="headerColor">
          <a-icon
            v-if="isAuthenticated"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <span v-if="isAuthenticated" class="route-name">{{
            $route.name
          }}</span>
          <!--Register & Login-->
          <div v-if="!isAuthenticated">
            <a-button
              type="link"
              class="auth-link"
              style="margin-right: 10px"
              @click="$router.push('/login', () => {})"
            >
              Login
            </a-button>
            <a-button
              type="link"
              class="auth-link"
              @click="$router.push('/register', () => {})"
            >
              Register
            </a-button>
          </div>
          <!--Logout-->
          <a-button
            v-if="isAuthenticated"
            class="nav-link"
            type="link"
            @click="logout"
          >
            Logout
          </a-button>
          <!--Username-->
          <a-button v-if="isAuthenticated" class="nav-link" type="link">
            <a-icon type="user" />
            {{ this.user.username }}
          </a-button>
        </a-layout-header>
        <a-layout-content class="content">
          <Nuxt />
        </a-layout-content>
        <a-layout-footer></a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      collapsed: false,
      routes: [
        {
          name: "Auctions",
          route: "/auction",
          icon: "global"
        }
      ]
    };
  },
  beforeCreate() {
    this.$store.dispatch("authenticateUser");
  },
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
    }
  },
  computed: {
    ...mapState(["isAuthenticated", "user"]),
    headerColor() {
      return this.isAuthenticated ? "authenticated-nav" : "unauthenticated-nav";
    }
  }
};
</script>

<style></style>
