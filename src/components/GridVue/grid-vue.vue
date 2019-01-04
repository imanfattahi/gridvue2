<template>
    <div class="grid-vue" :class="config.theme.gridViewClass">
        <div v-if="Items.length">
            <select class="gv-paginate-select" v-if="config.paginate.perPageSelectable" v-model="config.paginate.perPage" :value="setPerPage">
                <option v-for="(value, index) in config.paginate.perPageValues" :key="index">{{ value }}</option>
            </select>
            <span v-if="config.showTotal">{{ config.paginate.total }}</span>
            <button type="button" class="gv-orientation" @click="changeOrientation">
                <span v-if="config.theme.orientation == 'vertical'">Horizontal</span>
                <span v-else-if="config.theme.orientation == 'horizontal'">Vertical</span>
            </button>
            <grid-vue-search :config="setConfig" v-on:Search="search"></grid-vue-search>
            <table class="gv-table responsive-table" :class="config.theme.orientation == 'horizontal' ? 'horizontal-table' : ''">
                <grid-vue-head :titles="titles" :config="setConfig" v-on:Filter="filter"></grid-vue-head>
                <grid-vue-items :fields="fields" :items="!this.config.paginate.status ? list : list.slice(this.config.paginate.perPage * (this.config.paginate.currentPage - 1), this.config.paginate.perPage * this.config.paginate.currentPage) " :config="setConfig"></grid-vue-items>
            </table>
            <grid-vue-paginate :config="setConfig" @SetPage="setPage"></grid-vue-paginate>
        </div>
        <div v-else>
            <p>
                There is nothing to show!
            </p>
        </div>
    </div>
</template>

<script>
  import GridVueSearch from "./includes/grid-vue-search";
  import GridVueHead from "./includes/grid-vue-head";
  import GridVuePaginate from "./includes/grid-vue-paginate";
  import GridVueItems from "./includes/grid-vue-items";
  export default {
    name: "gridvue2",
    components: {GridVueItems, GridVueHead, GridVueSearch, GridVuePaginate},
    props: [
      'Items', 'Config', 'Titles'
    ],
    beforeMount: function () {
      Object.assign(this.titles, this.Titles)
      Object.assign(this.config, this.Config)
      this.config.paginate.total = this.list.length
      this.config.paginate.totalPage = Math.ceil(this.config.paginate.total / this.config.paginate.perPage)
      this.fields = this.Items[0]  ? Object.keys(this.Items[0]) : [];
      this.titles = (this.titles.length && this.titles[0] !== '') ? this.titles : this.fields;
    },
    data: function () {
      return {
        list: this.Items,
        titles : [],
        fields: [],
        config: {
          numbering: true,
          showTotal: true,
          pick: true, // Pick or favorite show in all search result and filter dose not change the sort of these items
          editable: true,
          editableFields: [],
          removable: true,
          multipleRemove: true,
          theme: {
            caching: true,
            rtl: false,
            hoverable: true,
            orientation: 'vertical',
            gridViewClass: ''
          },
          paginate: {
            status: true,
            perPage: 10,
            perPageValues: [5, 10, 20 ,50 , 100],
            perPageSelectable: true,
            totalPage: 0,
            total: 0,
            currentPage: 1
          },
          filter: {
            status: true,
            orderBy: {
              field: '',
              ordering: ''
            }
          },
          search: {
            status: true,
            searchableFields: []
          },
        }
      }
    },
    methods: {
      changeOrientation () {
        this.config.theme.orientation = this.config.theme.orientation == 'horizontal' ? 'vertical' : 'horizontal'
      },
      search (searchQuery) {
        this.setPage(1)
          this.list = this.Items.filter(item => {
            return Object.keys(item).some(function (key) {
              return String(item[key]).toLowerCase().indexOf(searchQuery.toLowerCase()) > -1
            })
          })
        if (this.config.filter.orderBy.field) {
          this.filter()
        }
        this.config.paginate.total = this.list.length
      },
      filter (orderBy) {
        var key = orderBy ? orderBy.field : this.config.filter.orderBy.field
        var ordering = orderBy ? orderBy.ordering : this.config.filter.orderBy.ordering
        if (ordering == '') {
          this.list = this.Items
        }
          this.list.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            if (ordering == 'DESC') {
              return ((x > y) ? -1 : ((x < y) ? 1 : 0));
            } else {
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
          });
        return false
      },
      setPage (page) {
        this.config.paginate.currentPage = page
      }
    },
    computed: {
        setConfig: function () {
            return this.config
        },
      setPerPage: function () {
        return this.config.paginate.perPage
      }
    }
    ,
    watch: {
      setPerPage: function () {
        this.config.paginate.currentPage = 1
      }
    }
  }
</script>

<style scoped>
    @import '../../assets/GridVue.css';
    @import '../../assets/horizontal-table.css';
</style>