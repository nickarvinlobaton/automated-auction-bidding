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
  import { mapActions } from 'vuex'

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
      ...mapActions(['registerUser']),
      handleSubmit () {
        if(this.form.password === this.form.confirmPassword) {
          this.registerUser(this.form);
        } else {
          console.log('password doesnt match')
        }
      }
    }
  }
</script>

<style scoped>

</style>