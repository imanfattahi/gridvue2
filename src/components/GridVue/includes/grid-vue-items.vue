<template>
    <tbody>
    <tr v-for="(item, index) in picked" v-bind:key="index + Math.random()" class="gv-picked">
      <td v-for="(field, idx) in fields" v-bind:key="idx">{{ item[field] }}</td>
      <td>
        <button @click="drop(index)" type="button" class="gv-btn gv-btn-small gv-picked-btn">Picked</button>
      </td>
    </tr>
    <tr v-for="(item, index) in items" v-bind:key="index">
        <td v-for="(field, idx) in fields" v-bind:key="idx">{{ item[field] }}</td>
      <!-- Picked-->
      <td v-if="showOptions">
        <button v-if="config.pick" title="Pick" @click="pick(item)" type="button" class="gv-btn gv-btn-small gv-pick-btn">Pick</button>
        <button v-if="config.editable" title="Edit" @click="edit(item, index)" type="button" class="gv-btn gv-btn-small gv-edit-btn">Edit</button>
        <button v-if="config.removable" title="Remove" @click="remove(item, index)" type="button" class="gv-btn gv-btn-small gv-remove-btn">Remove</button>
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
            'config', 'items', 'fields', 'showOptions'
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
        },
        remove (item, index) {

        },
        edit (item, index) {

        }
      }
    }
</script>

<style scoped>

</style>