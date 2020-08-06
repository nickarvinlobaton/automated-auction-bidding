<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col :lg="6"></a-col>
      <a-col :lg="12">
        <a-card title="Login">
          <a-form-model layout="horizontal" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }"
                        @submit="handleSubmit">
            <a-form-model-item label="Username">
              <a-row type="flex" justify="center">
                <a-input
                  v-model="form.username"
                />
              </a-row>
            </a-form-model-item>
            <a-form-model-item label="Password">
              <a-row type="flex" justify="center">
                <a-input
                  v-model="form.password"
                  type="password"
                />
              </a-row>
            </a-form-model-item>

            <a-row type="flex" justify="center">
              <a-form-model-item>
                <a-button type="primary" @click="handleSubmit">
                  Login
                </a-button>
              </a-form-model-item>
            </a-row>

          </a-form-model>
        </a-card>
      </a-col>
      <a-col :lg="6"></a-col>
    </a-row>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

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