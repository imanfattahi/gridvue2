<template>
    <tbody>
    <tr v-for="(item, index) in picked" v-bind:key="index + Math.random()" class="gv-picked">
      <td v-for="(field, idx) in fields" v-bind:key="idx">{{ item[field] }}</td>
      <td>
        <button @click="drop(index)" type="button" class="gv-button">Picked</button>
      </td>
    </tr>
    <tr v-for="(item, index) in items" v-bind:key="index">
        <td v-for="(field, idx) in fields" v-bind:key="idx">{{ item[field] }}</td>
      <!-- Picked-->
      <td v-if="config.pick">
        <button @click="pick(item)" type="button" class="gv-button">Pick</button>
      </td>
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
        ],
      data: function () {
        return {
          picked: []
        }
      },
      methods: {
        pick (item) {
          this.picked.push(Object.assign({}, item))
        },
        drop (index) {
          this.picked.splice(index, 1)
        }
      }
    }
</script>

<style scoped>

</style>