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

        <a-table :columns="columns" :data-source="data" rowKey="id" />
      </a-card>
    </a-col>
    <a-col></a-col>
  </a-row>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "DomainComponent",
    data () {
      return {
        showModal: false,
        textAreaList: '',
        columns: [
          { title: 'Domain ID', dataIndex: 'domain_id' },
          { title: 'Domain name', dataIndex: 'domain_name' },
          { title: 'Max price', dataIndex: 'max_price' },
        ],
        data: [],
      }
    },
    async mounted() {

    },
    methods: {
      openModal () {
        this.showModal = true
      },
      async getDomains () {
        console.log(this.$store.state.user)
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.computedToken}`
            }
          };

          const response = await this.$axios.get(`./api/domain/${this.id.id}`, config);
          console.log(response);
          this.data = response.data.data;
        } catch (e) {
          console.log(e)
        }
      },
      handleSubmit () {},
    },
    computed: {
      ...mapState(['user', 'token']),
      id () {
        return this.user
      },
      computedToken () {
        return this.token
      }
    },
    watch: {
      id () {
        this.getDomains()
      }
    }
  }
</script>

<style scoped>

</style>