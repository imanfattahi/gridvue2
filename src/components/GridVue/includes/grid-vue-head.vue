<template>
    <thead>
    <tr>
        <th v-for="(title, index) in titles" :title="title" :key="index">
            <a v-if="config.filter.status" href="" @click="filter($event, index)">
                <span v-html="title"></span>
                <span v-if="config.filter.orderBy.field != getFieldByTitle(title)" style="float: right">
                    ↕
                </span>
                <span v-else-if="config.filter.orderBy.field == getFieldByTitle(title)" style="float: right">
                    <strong v-if="config.filter.orderBy.ordering == 'ASC'">↑</strong>
                    <strong v-else>↓</strong>
                </span>
            </a>
            <span v-else v-html="title"></span>
        </th>
      <th v-if="showOptions">
        <small>Options</small>
      </th>
    </tr>
    </thead>
</template>

<script>
    export default {
      created: function () {
        console.log(this.config.filter.orderBy.field)
      },
      name: "grid-vue-head",
      props: [
        'config', 'titles', 'showOptions', 'fields'
      ],
      data: function () {
        return {

        }
      },
       methods: {
        filter (event, index) {
          event.preventDefault()
          let field = this.fields[index]
          if (this.config.filter.orderBy.field == field) {
            this.config.filter.orderBy.ordering = (this.config.filter.orderBy.ordering == 'DESC' ? 'ASC' : 'DESC')
          } else {
            this.config.filter.orderBy.ordering = 'ASC'
          }
          this.config.filter.orderBy.field = field
          this.$emit('Filter', this.config.filter.orderBy)
        },
         getFieldByTitle (title) {
          if (!this.fields.length) {
            return title;
          } else {
            let index = this.titles.indexOf(title);
            return this.fields[index];
          }
         }
       }
    }
</script>

<style scoped>

</style>