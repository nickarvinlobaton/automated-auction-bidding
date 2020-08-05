<template>
  <div>
    <a-form-model layout="horizontal" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"
                  @submit="handleSubmit">
      <a-form-model-item label="Username">
        <a-input
          v-model="form.username"
        />
      </a-form-model-item>
      <a-form-model-item label="Password">
        <a-input
          v-model="form.password"
          type="password"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleSubmit">
          Login
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "LoginForm",
    data() {
      return {
        form: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      ...mapActions(['loginUser']),
      handleSubmit() {
        const payload = this.form;
        this.loginUser(payload);
      }
    }
  }
</script>

<style scoped>

</style>