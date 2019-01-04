<template>
    <thead>
    <tr>
        <th v-for="(title, index) in titles" :title="title" :key="index">
            <a v-if="status" href="" @click="filter($event, title)">
                <span v-html="title"></span>
                <span v-if="orderBy.field != title" style="float: right">
                    ↕
                </span>
                <span v-else-if="orderBy.field == title" style="float: right">
                    <strong v-if="orderBy.ordering == 'ASC'">↑</strong>
                    <strong v-else>↓</strong>
                </span>
            </a>
            <span v-else v-html="title"></span>
        </th>
    </tr>
    </thead>
</template>

<script>
    export default {
      beforeMount: function () {

      },
      name: "grid-vue-head",
      props: [
        'config', 'titles'
      ],
      data: function () {
        return {
          status: this.config.filter.status,
          orderBy: this.config.filter.orderBy
        }
      },
       methods: {
        filter (event, field) {
          event.preventDefault()
          if (this.orderBy.field == field) {
            this.orderBy.ordering = this.orderBy.ordering == 'DESC' ? 'ASC' : 'DESC'
          } else {
            this.orderBy.ordering = 'ASC'
          }
          this.orderBy.field = field
          this.$emit('Filter', this.orderBy)
        }
       }
    }
</script>

<style scoped>

</style>