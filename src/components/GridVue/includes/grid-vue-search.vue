<template>
    <div v-if="config.search.status" class="gv-search">
        <input type="text" v-model="searchQuery" v-on:keyup="search" v-on:change="search" :placeholder="config.search.placeholder">
    </div>
</template>

<script>
    export default {
        name: "grid-vue-search",
        props: [
            'config'
        ],
        data: function () {
            return {
                searchQuery: ''
            };
        },
        methods: {
            search: function () {
                this.$emit('Search', this.searchQuery)
            }
        }
    }
</script>

<style scoped>

</style>