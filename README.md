# vue-languages-dropdown

> Vue2 Languages dropdown component with search functionality


![alt text](https://raw.githubusercontent.com/maliknoorhassan/vue-languages-dropdown/master/src/assets/images/sample-screenshot-1.png "World Languages Dropdown")

![alt text](https://raw.githubusercontent.com/maliknoorhassan/vue-languages-dropdown/master/src/assets/images/sample-screenshot-2.png "World Languages Dropdown")

## Installation

``` bash
npm install vue-languages-dropdown --save
```

## Usage
```javascript
import LanguageDropdown from 'vue-languages-dropdown'
Vue.use(LanguageDropdown);

var app = new Vue({
    el: '#app',
    data: {
      selectedLang : "en"
    },
    methods: {
    	optionSelected: function (data) {
          
          console.log(data)
      }
    }
});
```

# Html
```html
<language-dropdown selected="ur" v-on:change="optionSelected"></language-dropdown>
```

# API
| Name | Type | Default | Description
|-----|:----------|:------|:----------
| selected          | String  | ur | Language ISO2 code, to show default selected language 
| show-search-input | Boolean | true | true or false value to show the search input in the dropdown 
| btn-bg-color      | String  | #ed4c46 | hex color code for the top button background
| btn-font-color    | String  | #fff | hex color code for the top button font color
| display-text      | String  | name | pass 'name' or 'native' value to show in the list, if pass 'native' language list will be displayed in native format

# Methods

This plugin emits an event on change, so that you can get the data upon language change. This will emit a data object on change
You can bind this method on change as
```javascript
v-on:change="yourMethodName"
```
as shown in above example.

You will receive the following data in emit.

| Name |  Description
|-----|:----------
| code | Language ISO2 code
| name | Language name in English
| native | Language name in native language text
| countries | An array of containing ISO2 codes of countries in which selected language is spoken 

