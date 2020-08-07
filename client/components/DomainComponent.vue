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

        <a-table
          class="data-table"
          :columns="columns" :data-source="data" rowKey="id"
          :loading="loading"
        />
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
        loading: false,
        textAreaList: '',
        columns: [
          { title: 'Domain ID', dataIndex: 'domain_id' },
          { title: 'Domain name', dataIndex: 'domain_name' },
          { title: 'Max price', dataIndex: 'max_price', className: 'column-money', },
        ],
        data: [],
      }
    },
    async mounted() {
      this.getDomains();
    },
    methods: {
      openModal () {
        this.showModal = true
      },
      async getDomains () {
        this.loading = true;
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${this.computedToken}`
            }
          };

          const response = await this.$axios.get(`./api/domain/${this.userData.id}`, config);
          this.data = response.data.data;
          this.loading = false;
        } catch (e) {
          console.log(e);
          this.loading = false;
        }
      },
      handleSubmit () {},
    },
    computed: {
      ...mapState(['user', 'token']),
      userData () {
        return this.user
      },
      computedToken () {
        return this.token
      }
    },
    watch: {
      userData () {
        this.getDomains()
      }
    }
  }
</script>

<style scoped>

</style>