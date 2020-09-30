<template>
  <div>
    <a-button
      type="primary"
      :disabled="!hasSelected"
      :loading="disableBtnLoading"
      @click="enableAuctions(selectedRowKeys)"
    >
      Enable
    </a-button>

    <a-table
      class="data-table"
      :columns="columns"
      :data-source="data"
      rowKey="id"
      :loading="loading"
      :row-selection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
    />
  </div>
</template>

<script>
export default {
  name: "DisabledAuctions",
  props: ["data", "disableBtnLoading", "loading"],
  data() {
    return {
      selectedRowKeys: [],
      columns: [
        { title: "Domain ID", dataIndex: "domain_id" },
        { title: "Domain name", dataIndex: "domain_name" },
        {
          title: "Max price",
          dataIndex: "max_price",
          className: "column-money"
        }
      ]
    };
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    enableAuctions(selectedRowKeys) {
      this.$emit("enable-auction", selectedRowKeys);
      this.selectedRowKeys = [];
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  }
};
</script>
