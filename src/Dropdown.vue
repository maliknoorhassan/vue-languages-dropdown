<template>
  <div>
  <div class="dropdown">
    <button v-on:click="toggle" class="dropbtn">{{selectedLang}}</button>
    <input type="search" placeholder="Search.." class="search-input" ref="searchInput" v-model="search" autocomplete="off" v-bind:class="{show : isOpen}" v-if="this.showSearchInput">
    <div id="myDropdown" class="dropdown-content" v-bind:class="{show : isOpen, hide : !isOpen}">
      <a v-for="(c,i) in filteredLanguages" v-on:click="onLanguageChange(c.code,c.name,c.nativeName )">
        <span>{{ c.nativeName }}</span>
      </a>
    </div>
  </div>
</div>
</template>

<script>

  import jsonfile from './data/languages.json';
  
  export default {
    name     : "language-dropdown",
    props: {
      showSearchInput :{
        type    : Boolean,
        default : true
      },
      selected: {
        type: String,
        required: true
      }
    },
    mounted()
    {
      let index         = this.languages.map(function (lang) { return lang.code; }).indexOf(this.selected.toLowerCase());
      let userIsoCode   = this.languages[index]['name'];    
      this.selectedLang = userIsoCode;
    },
    data: function() {
      return {
        selectedLang : 'English',
        search       : '',
        isOpen       : false,
        languages    : jsonfile
      }

    },
    computed:
    {
      filteredLanguages:function()
      {
        let self = this;
        return this.languages.filter(function(lang){
          return (
           lang.code.toLowerCase().indexOf(self.search.toLowerCase())>=0
           || lang.name.toLowerCase().indexOf(self.search.toLowerCase())>=0
           || lang.nativeName.toLowerCase().indexOf(self.search.toLowerCase())>=0); 

        });
      }
    },
    methods: {
      onLanguageChange: function (code,name,native) 
      {
        let data          = { 'code' : code, 'name' : name, 'native' : native};
        this.selectedLang = name;    
        this.$emit('change', data);
        this.hide();
      },
      toggle: function() {
        this.isOpen = !this.isOpen;
      },
      show: function() {
        this.isOpen = true;
      },
      hide: function() {
        this.isOpen = false;
      }
    }
  }
</script>

<style>
@import './assets/css/style.css';
</style>