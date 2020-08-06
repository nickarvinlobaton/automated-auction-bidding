<template>
  <a-row type="flex" justify="center">
    <a-col></a-col>
    <a-col :lg="24" :xs="24">
      <a-card class="content-card">
        <a-button type="primary" @click="openModal">
          Add Domain List
        </a-button>
        <a-modal
          v-model="showModal"
          title="Add domain list"
          centered
          width="60%"
          @ok="handleSubmit" @cancel="showModal=false"
        >
          <a-textarea
            v-model="textAreaList"
            placeholder="Format: domain name, domain id, treshold"
            :auto-size="{ minRows: 10, maxRows: 10 }"
          />
        </a-modal>
      </a-card>
    </a-col>
    <a-col></a-col>
  </a-row>
</template>

<script>
  export default {
    name: "DomainComponent",
    data () {
      return {
        showModal: false,
        textAreaList: '',
      }
    },
    methods: {
      openModal () {
        this.showModal = true
      },
      handleSubmit () {},
    }
  }
</script>

<style scoped>

</style>