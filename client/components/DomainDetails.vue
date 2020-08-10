<template>
  <div>
    <a-row type="flex" justify="center">
      <a-col></a-col>
      <a-col :lg="24" :xs="24">
        <a-card class="content-card" title="Details">
          <a-row>
            <a-col :lg="12" :xs="24"><h3>Domain name: Domain_name</h3></a-col>
          </a-row>
          <a-row>
            <a-col :lg="12" :xs="24"><span>Bids/Offers: Bids_offers</span></a-col>
          </a-row>
          <a-row>
            <a-col :lg="12" :xs="24"><span>Minimum Offer: min_offer</span></a-col>
          </a-row>
          <a-row>
            <a-col :lg="12" :xs="24"><span>Status: current_status</span></a-col>
          </a-row>
          <a-row>
            <a-col :lg="12" :xs="24"><span>Auction ends: end_date</span></a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
  export default {
    name: "DomainDetails"
  }
</script>

<style scoped>

</style>