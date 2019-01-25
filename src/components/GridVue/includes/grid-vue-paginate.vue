<template>
    <div v-show="config.paginate.status && config.paginate.total">
        <br>
        <ul class="gv-paginate">
            <li><a href=""
                   :disabled="config.paginate.currentPage == 1"
                   :class="config.paginate.currentPage == 1 ? 'disable' : ''"
                   @click.prevent="previousPage()">&#60;</a></li>
            <li v-for="index in Math.ceil(this.config.paginate.total / this.config.paginate.perPage)"
                :key="index">
              <a href=""
                 :class="{ active: config.paginate.currentPage == index}"
                 @click.prevent="goToPage(index)">{{ index }}</a>
            </li>
            <li>
              <a href=""
                 :disabled="config.paginate.currentPage == Math.ceil(this.config.paginate.total / this.config.paginate.perPage)"
                 :class="config.paginate.currentPage == Math.ceil(this.config.paginate.total / this.config.paginate.perPage) ? 'disable' : ''"
                 @click.prevent="nextPage()">&#62;</a>
            </li>
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
          if (this.config.paginate.currentPage < this.config.paginate.totalPage){
            this.config.paginate.currentPage++
            this.$emit('SetPage', this.config.paginate.currentPage)
          }
        },
        previousPage: function () {
          if (this.config.paginate.currentPage > 1) {
            this.config.paginate.currentPage--
            this.$emit('SetPage', this.config.paginate.currentPage)
          }
        },
        goToPage: function (pageId) {
          this.config.paginate.currentPage = pageId
          this.$emit('SetPage', this.config.paginate.currentPage)
        }
      },
      computed: {

      }
    }
</script>

<style scoped>

</style>