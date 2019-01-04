# Gridvue2
The Gridvue2 is a GridView that view mode displays a list of data items by binding data fields to columns and by displaying a column header to identify the field. The default GridView style implements buttons as column headers. By using buttons for column headers, you can implement important user interaction capabilities; for example, users can click the column header to sort GridView data according to the contents of a specific column.
## Installation
``` 
npm install --save gridvue2
```

### Basic Usage
Add this lines on top of your main.js 
``` js
import Vue from 'vue'
import GridVue2 from 'gridvue2'

Vue.component('gridvue2', GridVue2)
```

Add these lines on top of your main.js
```vue
<template>
  <div id="app">
    <gridvue2 :Items="items" :Config="config" :Titles="titles"></gridvue2>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      titles : [],
      config: {},
      items: [
        {
          "first_name": "Rebbecca",
          "last_name": "Didio",
          "company_name": "Brandt, Jonathan F Esq",
          "address": "171 E 24th St",
          "city": "Leith",
          "state": "TAS",
          "post": 7315,
          "phone1": "03-8174-9123",
          "phone2": "0458-665-290",
          "email": "rebbecca.didio@didio.com.au",
          "web": "http://www.brandtjonathanfesq.com.au"
        },
        {
          "first_name": "Stevie",
          "last_name": "Hallo",
          "company_name": "Landrum Temporary Services",
          "address": "22222 Acoma St",
          "city": "Proston",
          "state": "QLD",
          "post": 4613,
          "phone1": "07-9997-3366",
          "phone2": "0497-622-620",
          "email": "stevie.hallo@hotmail.com",
          "web": "http://www.landrumtemporaryservices.com.au"
        },
        {
          "first_name": "Mariko",
          "last_name": "Stayer",
          "company_name": "Inabinet, Macre Esq",
          "address": "534 Schoenborn St #51",
          "city": "Hamel",
          "state": "WA",
          "post": 6215,
          "phone1": "08-5558-9019",
          "phone2": "0427-885-282",
          "email": "mariko_stayer@hotmail.com",
          "web": "http://www.inabinetmacreesq.com.au"
        },
        {
          "first_name": "Gerardo",
          "last_name": "Woodka",
          "company_name": "Morris Downing & Sherred",
          "address": "69206 Jackson Ave",
          "city": "Talmalmo",
          "state": "NSW",
          "post": 2640,
          "phone1": "02-6044-4682",
          "phone2": "0443-795-912",
          "email": "gerardo_woodka@hotmail.com",
          "web": "http://www.morrisdowningsherred.com.au"
        },
        {
          "first_name": "Mayra",
          "last_name": "Bena",
          "company_name": "Buelt, David L Esq",
          "address": "808 Glen Cove Ave",
          "city": "Lane Cove",
          "state": "NSW",
          "post": 1595,
          "phone1": "02-1455-6085",
          "phone2": "0453-666-885",
          "email": "mayra.bena@gmail.com",
          "web": "http://www.bueltdavidlesq.com.au"
        },
        {
          "first_name": "Idella",
          "last_name": "Scotland",
          "company_name": "Artesian Ice & Cold Storage Co",
          "address": "373 Lafayette St",
          "city": "Cartmeticup",
          "state": "WA",
          "post": 6316,
          "phone1": "08-7868-1355",
          "phone2": "0451-966-921",
          "email": "idella@hotmail.com",
          "web": "http://www.artesianicecoldstorageco.com.au"
        }
      ]
    }
  }
}
</script>
``` 
### Data Binding
You should pass your data in JSON format to 'Items' property.

### Titles
This is an optional option to show your own titles to header of the Gridvue. If you leave it empty Gridvue show the object keys in header please see the following exmaple:
``` js
this.titles = ['ID', 'First Name', 'Last Name']
```

### Configuration
You can do some professional config please pay attention to following table:

| Config | Description| Data Type | Default Value
| ------ | ------ | ------ | ------ |
| showTotal | Show the total of items | Boolean | true |
| theme.orientation | Show Vertical or Horizontal table | String ('vertical'/ 'horizontal') | 'vertical' |
| theme.gridViewClass | Add additional class name to parent of html element to customization style| String | null |
| paginate.status | Show paginate data rows | Boolean | true |
| paginate.perPage | Number of rows show in a page | Integer | 10 |
| paginate.perPageSelectable | User can select how many numbers of rows must be shown | Boolean | true |
| paginate.perPageValues | List of total numbers of rows they show to user | Array | [5 ,10, 20, 50, 100] |
| paginate.totalPage | Total of pages | Integer | Calculate |
| paginate.total | Total numbers of rows | Integer | Calculate |
| paginate.currentPage | Active page | Integer | 1 |
| filter.status | Filter data and order them | Boolean | true |
| filter.orderBy.field | Field that you wanna order data depend | String | null |
| filter.orderBy.ordering | Order data | String ('ASC'/'DESC') | 'ASC' |
| search.status | Search in data | Boolean | true |

Prefix of all the configs are "this.config." for example: this.config.search.status = true
### Contact me
imanfava@gmail.com
