<template>
    <div v-if="config.search.status">
        <input type="text" v-model="searchQuery" v-on:keyup="search" v-on:change="search" class="gv-search" placeholder="Search something...">
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