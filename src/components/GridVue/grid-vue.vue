<template>
    <div class="grid-vue" :class="config.theme.classes" :id="config.id">
        <div v-if="items.length">
          <div class="gv-head">
            <!-- Count of rows in each page -->
            <div v-if="config.paginate.perPageSelectable" class="gv-paginate-select">
              Per Page:
              <select v-model="config.paginate.perPage" :value="setPerPage">
                <option v-for="(value, index) in config.paginate.perPageValues" :key="index">{{ value }}</option>
              </select>
            </div>
            <!-- Total rows -->
            <div class="gv-total" v-if="config.showTotal">
              Total rows:
              <span>{{ config.paginate.total }}</span>
            </div>
            <!-- Search -->
            <grid-vue-search
              :config="setConfig"
              v-on:Search="search"></grid-vue-search>
            <!-- Orientation -->
            <div v-if="config.theme.orientation != undefined && config.theme.orientation !== ''" class="gv-orientation">
              <button type="button" @click="changeOrientation" class="gv-btn gv-orientation-btn">
                <span v-if="config.theme.orientation == 'vertical'">Horizontal</span>
                <span v-else-if="config.theme.orientation == 'horizontal'">Vertical</span>
              </button>
            </div>
          </div>
          <!-- Table -->
            <table class="gv-table responsive-table" :class="tableClasses">
                <!-- Header of table - Titles -->
                <grid-vue-head
                  :showOptions="showOptions"
                  :titles="titles" :fields="fields"
                  :config.sync="setConfig"
                  v-on:Filter="filter"></grid-vue-head>
                <!-- Rows - Data -->
                <grid-vue-items
                  v-on:Remove="remove"
                  :functions="this.Functions"
                  :showOptions="showOptions"
                  :fields="fields"
                  :model="this.Items"
                  :items="!this.config.paginate.status ? list : list.slice(this.config.paginate.perPage * (this.config.paginate.currentPage - 1), this.config.paginate.perPage * this.config.paginate.currentPage) "
                  :config.sync="setConfig"></grid-vue-items>
            </table>
            <!-- Paginate -->
            <grid-vue-paginate
              :config.sync="setConfig"
              @SetPage="setPage"></grid-vue-paginate>
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
      'Items', 'Config', 'Titles', 'Functions'
    ],
    beforeMount: function () {
      Object.assign(this.titles, this.Titles)
      this.config = this.overrideObject(this.config, this.Config)
      Object.getOwnPropertyNames(this.titles)
      this.calculatePaginate()
      this.fields = this.list[0]  ? Object.keys(this.list[0]) : [];
      this.titles = (this.titles.length && this.titles[0] !== '') ? this.titles : this.fields;
      /* Cookie */
      this.setInitalCookies()
    },
    data: function () {
      return {
        items: Object.assign([], this.Items),
        list: this.Items,
        titles : [],
        fields: [],
        config: {
          id: '',
          numbering: true,
          showTotal: true,
          pick: true,
          editable: true,
          editableFields: [],
          removable: true,
          removeConfirm: true,
          multipleRemove: true,
          cookie: true,
          cookieExpire: 7, /* Days */
          theme: {
            name: 'default',
            rtl: false,
            hoverable: true,
            zebra: true,
            orientation: 'vertical',
            classes: ''
          },
          paginate: {
            status: true,
            perPage: 10,
            perPageSelectable: true,
            perPageValues: [5, 10, 20 ,50 , 100],
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
            placeholder: 'Search something...',
            searchableFields: []
          },
        },
        cookiePrefix: 'gv-'
      }
    },
    methods: {
      changeOrientation () {
        this.config.theme.orientation = this.config.theme.orientation == 'horizontal' ? 'vertical' : 'horizontal'
        this.setCookie(this.config.id + '-orientation',this.config.theme.orientation == 'horizontal' ? 'horizontal' : 'vertical' , this.config.cookieExpire)
      },
      search (searchQuery) {
        searchQuery = searchQuery.trim()
        this.setPage(1)
          this.list = this.items.filter(item => {
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
          this.list = this.items
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
        this.setCookie(this.config.id + '-orderBy',  JSON.stringify({field: key, ordering: ordering}), this.config.cookieExpire)
        return false
      },
      remove (item, index) {
        this.list.splice(index, 1)
        this.items.splice(this.items.indexOf(item), 1)
        this.calculatePaginate();
        if (this.config.paginate.currentPage > this.config.paginate.totalPage)
          if (this.config.paginate.currentPage > 1)
            this.config.paginate.currentPage--;
      },
      setPage (page) {
        this.config.paginate.currentPage = page
      },
      calculatePaginate: function () {
        this.config.paginate.total = this.setTotal
        this.config.paginate.totalPage = this.setTotalPage
      },
      setInitalCookies () {
        if (this.config.cookie) {
          if (this.checkCookie(this.config.id + "-orientation")) {
            this.config.theme.orientation = this.getCookie(this.config.id + "-orientation")
          }
          if (this.checkCookie(this.config.id + "-orderBy")) {
            this.filter(JSON.parse(this.getCookie(this.config.id + "-orderBy")))
          }
          if (this.checkCookie(this.config.id + "-perPage")) {
            this.config.paginate.perPage = this.getCookie(this.config.id + "-perPage")
          }
        }
      },
      setCookie (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = this.cookiePrefix + cname + "=" + cvalue + ";" + expires + ";path=/";
      },
      getCookie (cname) {
        var name = this.cookiePrefix + cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      },
      checkCookie (name) {
        var cookie = this.getCookie(name)
        if (cookie != "") {
          return true
        } else {
          return false
        }
      },
      overrideObject (o1,o2){
        var res = {};
        for (var a in o1){
          if(typeof o1[a] == 'object'){
            res[a] = this.overrideObject(o1[a],o2[a])
          }
          else{
            res[a] = o1[a];
            if(typeof o2[a] != 'undefined') res[a] = o2[a];
          }
        }
        return res;
      }
    },
    computed: {
      showOptions () {
        if (this.config.removable)
          return true;
        if (this.config.editable)
          return true;
        if (this.config.pick)
          return true;
        return false;
      },
      tableClasses () {
        let classes = '';
        classes += this.config.theme.orientation == 'horizontal' ? 'horizontal-table' : ''
        classes += this.config.theme.hoverable == true ? ' hoverable' : ''
        classes += this.config.theme.zebra == true ? ' zebra' : ''
        return classes
      },
      setConfig: function () {
          return this.config
      },
      setPerPage: function () {
        return this.config.paginate.perPage
      },
      setTotalPage: function () {
        return Math.ceil(this.config.paginate.total / this.config.paginate.perPage)
      },
      setTotal: function () {
        return this.list.length
      }
    },
    watch: {
      setPerPage: function () {
        this.setCookie(this.config.id + "-perPage", this.config.paginate.perPage, this.config.cookieExpire)
        this.config.paginate.currentPage = 1
      }
    }
  }
</script>

<style lang="scss">
  @import '../../assets/scss/default.scss';
</style>

<style scoped>
    @import '../../assets/css/GridVue.css';
    @import '../../assets/css/horizontal-table.css';
</style>