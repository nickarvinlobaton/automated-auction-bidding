<template>
  <div>
    <a-layout id="components-layout-demo-custom-trigger">
      <a-layout-sider
        v-if="sidebar"
        v-model="collapsed"
        :trigger="null"
        collapsible>
        <div class="logo"/>
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
          <a-menu-item key="1">
            <a-icon type="user"/>
            <span>nav 1</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="video-camera"/>
            <span>nav 2</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="upload"/>
            <span>nav 3</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header :style="{background: headerColor, padding: 0}">
          <a-icon
            v-if="sidebar"
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
          <div v-if="!sidebar">
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
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '75vh' }"
        >
          <Nuxt/>
        </a-layout-content>
        <a-layout-footer></a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        collapsed: false,
        sidebar: false,
      };
    },
    computed: {
      headerColor() {
        return this.sidebar ? '#fff' : '#001529'
      },
    }
  }
</script>

<style>
  #components-layout-demo-custom-trigger .trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }

  #components-layout-demo-custom-trigger .trigger:hover {
    color: #1890ff;
  }

  #components-layout-demo-custom-trigger .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }

  .auth-link {
    float: right;
    padding: 16px 14px;
    color: #ffffff
  }
</style>
