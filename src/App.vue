<template>
  <div id="app" class="test-app">
    <gridvue2 :Items="items" :Config="config" :Titles="titles" :Functions="functions"></gridvue2>
  </div>
</template>

<script>

export default {
  name: 'app',
  data: function () {
    return {
      titles: ['First Name', 'Last Name', 'Company', 'Address', 'City', 'State', 'Post', 'Phone'],
      functions: {
        first_name: function (item, model) {
          return item.first_name.toUpperCase()
        }
      },
      config: {
        showTotal: true,
        print: true,
        pick: true,
        editable: true,
        editableFields: [],
        removable: true,
        multipleRemove: true,
        theme: {
          caching: true,
          rtl: false,
          hoverable: true,
          zebra: true,
          orientation: 'vertical',
          classes: ''
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
      },
      items: [
        {
          "first_name": "Rebbecca",
          "last_name": "Didio",
          "company_name": "Brandt, Jonathan F Esq",
          "address": "171 E 24th St",
          "city": "Leith",
          "state": "TAS",
          "post": 7315,
          "phone": "03-8174-9123"
        },
        {
          "first_name": "Stevie",
          "last_name": "Hallo",
          "company_name": "Landrum Temporary Services",
          "address": "22222 Acoma St",
          "city": "Proston",
          "state": "QLD",
          "post": 4613,
          "phone": "07-9997-3366"
        },
        {
          "first_name": "Mariko",
          "last_name": "Stayer",
          "company_name": "Inabinet, Macre Esq",
          "address": "534 Schoenborn St #51",
          "city": "Hamel",
          "state": "WA",
          "post": 6215,
          "phone": "08-5558-9019"
        },
        {
          "first_name": "Gerardo",
          "last_name": "Woodka",
          "company_name": "Morris Downing & Sherred",
          "address": "69206 Jackson Ave",
          "city": "Talmalmo",
          "state": "NSW",
          "post": 2640,
          "phone": "02-6044-4682"
        },
        {
          "first_name": "Mayra",
          "last_name": "Bena",
          "company_name": "Buelt, David L Esq",
          "address": "808 Glen Cove Ave",
          "city": "Lane Cove",
          "state": "NSW",
          "post": 1595,
          "phone": "02-1455-6085"
        },
        {
          "first_name": "Idella",
          "last_name": "Scotland",
          "company_name": "Artesian Ice & Cold Storage Co",
          "address": "373 Lafayette St",
          "city": "Cartmeticup",
          "state": "WA",
          "post": 6316,
          "phone": "08-7868-1355"
        },
        {
          "first_name": "Sherill",
          "last_name": "Klar",
          "company_name": "Midway Hotel",
          "address": "87 Sylvan Ave",
          "city": "Nyamup",
          "state": "WA",
          "post": 6258,
          "phone": "08-6522-8931"
        },
        {
          "first_name": "Ena",
          "last_name": "Desjardiws",
          "company_name": "Selsor, Robert J Esq",
          "address": "60562 Ky Rt 321",
          "city": "Bendick Murrell",
          "state": "NSW",
          "post": 2803,
          "phone": "02-5226-9402"
        },
        {
          "first_name": "Vince",
          "last_name": "Siena",
          "company_name": "Vincent J Petti & Co",
          "address": "70 S 18th Pl",
          "city": "Purrawunda",
          "state": "QLD",
          "post": 4356,
          "phone": "07-3184-9989"
        },
        {
          "first_name": "Theron",
          "last_name": "Jarding",
          "company_name": "Prentiss, Paul F Esq",
          "address": "8839 Ventura Blvd",
          "city": "Blanchetown",
          "state": "SA",
          "post": 5357,
          "phone": "08-6890-4661"
        },
        {
          "first_name": "Amira",
          "last_name": "Chudej",
          "company_name": "Public Works Department",
          "address": "3684 N Wacker Dr",
          "city": "Rockside",
          "state": "QLD",
          "post": 4343,
          "phone": "07-8135-3271"
        },
        {
          "first_name": "Marica",
          "last_name": "Tarbor",
          "company_name": "Prudential Lighting Corp",
          "address": "68828 S 32nd St #6",
          "city": "Rosegarland",
          "state": "TAS",
          "post": 7140,
          "phone": "03-1174-6817"
        },

      ]
    }
  }
}
</script>

<style>
  .test-app {
    background: #fff;
    width: 80%;
    margin: auto;
    overflow: hidden;
    overflow-x: auto;
    padding: 20px 50px;
  }

</style>
