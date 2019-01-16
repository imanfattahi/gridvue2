<template>
    <div v-show="config.paginate.status && config.paginate.total">
        <br>
        <ul class="gv-paginate">
            <li><a :disabled="currentPage == 1" href="" :class="currentPage == 1 ? 'disable' : ''" @click.prevent="previousPage()">&#60;</a></li>
            <li v-for="index in Math.ceil(this.config.paginate.total / this.config.paginate.perPage)" :key="index"><a href="" :class="currentPage == index ? 'active' : ''" @click.prevent="goToPage(index)">{{ index }}</a></li>
            <li><a :disabled="currentPage == Math.ceil(this.config.paginate.total / this.config.paginate.perPage)" :class="currentPage == Math.ceil(this.config.paginate.total / this.config.paginate.perPage) ? 'disable' : ''" href="" @click.prevent="nextPage()">&#62;</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
      beforeMount: function () {

      },
        props: [
            'config'
        ],
        name: "grid-vue-paginate",
      methods: {
        nextPage: function () {
          if (this.currentPage < this.config.paginate.totalPage){
            this.currentPage++
            this.$emit('SetPage', this.currentPage)
          }
          console.log(this.config.paginate.totalPage)
        },
        previousPage: function () {
          if (this.currentPage > 1) {
            this.currentPage--
            this.$emit('SetPage', this.currentPage)
          }
        },
        goToPage: function (pageId) {
          this.currentPage = pageId
          this.$emit('SetPage', this.currentPage)
        }
      },
      data: function () {
        return {
          currentPage: this.config.paginate.currentPage,
          pages: {

          }
        }
      },
      computed: {

      }
    }
</script>

<style scoped>

</style>