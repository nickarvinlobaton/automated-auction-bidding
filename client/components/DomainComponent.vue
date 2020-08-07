<template>
  <a-row type="flex" justify="center">
    <a-col></a-col>
    <a-col :lg="24" :xs="24">
      <a-card class="content-card">
        <a-tabs type="card">

          <a-tab-pane key="1" tab="Active auctions">
            <a-button type="primary" @click="openModal">
              Add Domain List
            </a-button>

            <a-button
              type="danger" :disabled="!hasSelected"
              :loading="disableBtnLoading"
              @click="disableAuctions"
            >
              Disable
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
                placeholder="Format: Domain name, Auction ID, Price treshold"
                :auto-size="{ minRows: 10, maxRows: 10 }"
              />
            </a-modal>

            <a-table
              class="data-table"
              :columns="columns" :data-source="data" rowKey="id"
              :loading="loading"
              :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
            />
          </a-tab-pane>

          <a-tab-pane key="2" tab="Disabled auctions">
            Disabled
          </a-tab-pane>

        </a-tabs>
      </a-card>
    </a-col>
    <a-col></a-col>
  </a-row>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "DomainComponent",
    data() {
      return {
        showModal: false,
        loading: false,
        disableBtnLoading: false,
        textAreaList: '',
        columns: [
          {title: 'Domain ID', dataIndex: 'domain_id'},
          {title: 'Domain name', dataIndex: 'domain_name'},
          {title: 'Max price', dataIndex: 'max_price', className: 'column-money',},
        ],
        data: [],
        selectedRowKeys: [],
      }
    },
    async mounted() {
      this.getDomains();
    },
    methods: {
      openModal() {
        this.showModal = true
      },
      async getDomains() {
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
      async handleSubmit() {
        this.loading = true;
        for (let i = 0; i < this.domainList.length; i++) {
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.computedToken}`
              }
            };
            const postData = JSON.stringify(this.domainList[i]);
            const response = await this.$axios.post('./api/domain', postData, config);
            console.log(response);
            this.textAreaList = ''
          } catch (e) {
            console.log(e)
          }
        }
        this.getDomains();
        this.loading = false;
        this.showModal = false;
      },
      onSelectChange(selectedRowKeys) {
        this.selectedRowKeys = selectedRowKeys;
      },
      disableAuctions() {
        this.disableBtnLoading = true;
        setTimeout(() => {
          console.log(this.selectedRowKeys)
          this.disableBtnLoading = false;
          this.selectedRowKeys = []
        }, 2000)
      },
    },
    computed: {
      ...mapState(['user', 'token']),
      userData() {
        return this.user
      },
      computedToken() {
        return this.token
      },
      splitTextByNewLine() {
        return this.textAreaList.split(/\r?\n/);
      },
      hasSelected() {
        return this.selectedRowKeys.length > 0;
      },
      domainList() {
        let text = [...this.splitTextByNewLine];
        let newText = [];
        let enteredDomainData = [];
        // separate commas to output array
        for (let i = 0; i < text.length; i++) {
          newText.push(text[i].split(','));
        }
        // convert array to object
        for (let i = 0; i < newText.length; i++) {
          let array = [...newText[i]];
          enteredDomainData[i] = {};
          enteredDomainData[i].user_id = this.userData.id;
          enteredDomainData[i].domain_name = array[0];
          enteredDomainData[i].domain_id = array[1];
          enteredDomainData[i].max_price = array[2];
        }

        return enteredDomainData;
      },
    },
    watch: {
      userData() {
        this.getDomains()
      }
    }
  }
</script>

<style scoped>

</style>