<template>
  <div class="app-main">
    <div class="x-edit">
      <work-table></work-table>
    </div>
    <div class="x-side">
    </div>
    <div class="x-side x-fixed-side">
      <table-side></table-side>
    </div>
  </div>
</template>

<script>
import WorkTable from '../components/WorkTable'
import TableSide from '../components/TableSide'

export default {
  name: 'edit-view',
  components: {WorkTable, TableSide},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.app-main {
  display: flex;

  .x-edit {
    flex: 1;
  }
  .x-side {
    min-width: 200px;
    max-height: 100vh;
    overflow: auto;
  }
  .x-fixed-side {
    position: fixed;
    right: 150px;
  }
}
</style>
