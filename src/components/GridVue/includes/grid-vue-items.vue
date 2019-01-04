<template>
    <tbody>
    <tr v-for="(item, index) in items" v-bind:key="index">
        <td v-for="(field, idx) in fields" v-bind:key="idx">{{ item[field] }}</td>
    </tr>
    </tbody>
</template>

<script>
    export default {
      beforeMount: function () {

      },
        name: "grid-vue-items",
        props: [
            'config', 'items', 'fields'
        ]
    }
</script>

<style scoped>

</style>