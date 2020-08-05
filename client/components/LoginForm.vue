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
      async handleSubmit() {
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        try {
          const data = JSON.stringify({
            grant_type: "password",
            client_id: 2,
            client_secret: "jbBMtwBc8SUHJCx6Zf90YgVxxG69H5cxMriLbKd8",
            username: this.form.username,
            password: this.form.password
          });
          const res = await this.$axios.post("http://localhost:8000/oauth/token", data, config);
          console.log(res);
        } catch (e) {
            console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>