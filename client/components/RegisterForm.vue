<template>
  <div>
    <a-form-model layout="horizontal" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }"
                  @submit="handleSubmit">
      <a-form-model-item label="Name">
        <a-input
          v-model="form.name"
        />
      </a-form-model-item>
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
      <a-form-model-item label="Confirm Password">
        <a-input
          v-model="form.confirmPassword"
          type="password"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="handleSubmit">
          Register
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
  export default {
    name: "RegisterForm",
    data () {
      return {
        form: {
          name: '',
          username: '',
          password: '',
          confirmPassword: '',
        }
      }
    },
    methods: {
      async handleSubmit () {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json"
            }
          };
          const { name, username, password } = this.form;
          const data = JSON.stringify({
            name,
            username,
            password,
          });
          const response = await this.$axios.post("http://localhost:8000/api/user", data, config);
          console.log(response);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped>

</style>