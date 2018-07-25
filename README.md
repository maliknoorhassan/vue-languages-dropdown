# vue-languages-dropdown

> Vue2 Languages dropdown component with search 

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

# Properties
| Name | Type | Description
|-----|:----------:|:----------
| selected | String | Language ISO2 code, to show default selected language 
| show-search-input | Boolean | true or false value to show the search input in the dropdown 

# Methods

This plugin emits an event on change, so that you can get the data upon language change.
You can bind this method on change as
```javascript
v-on:change="yourMethodName"
```
as shown in above example.

#Screenshot

![alt text](https://github.com/beyondplus/flags-dropdown-vue/raw/master/raw/world-flags.png "World Languages Dropdown")

