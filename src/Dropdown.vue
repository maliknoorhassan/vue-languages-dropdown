<template>
  <div>
  
   <div class="dropdown">
    <button v-on:click="toggle" class="dropbtn"><i v-bind:class="'flag flag-'+selectFlag"></i> {{selectedLang}}</button>
    <input type="search" placeholder="Search.." class="search-input" ref="searchInput" v-model="search" autocomplete="off" v-bind:class="{show : isOpen}" v-if="this.showSearchInput">
    <div id="myDropdown" class="dropdown-content" v-bind:class="{show : isOpen, hide : !isOpen}" style="overflow-x: hidden;">

      <div class="wrapper">

      <a v-for="(c,i) in filteredLanguages" style="width: 100%" v-on:click="onLanguageChange(c.code,c.name,c.nativeName,c.countries)">
        <div  class="float-left" style="width: 125px;white-space: nowrap;overflow: hidden;padding-left: 3px;"><span>{{ c.name }}</span></div>

         <div class="right-container">
            <div v-on:click="scrollLeft(i)" class="scroll-btn float-left"><!-- &#60; -->«</div>

        <div class="wrapper-box" v-bind:class="'wrapper-box-'+i">
          <span v-for="f in c.countries" class="mr-5"><i v-bind:class="'flag flag-'+f"></i></span>
        </div>

         <div v-on:click="scrollRight(i)" class="scroll-btn float-right"><!-- &#62; -->»</div>

       </div>

      </a>

    </div>

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
        selectFlag   : 'gb',
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
      onLanguageChange: function (code,name,native,countries) 
      {
        let data          = { 'code' : code, 'name' : name, 'native' : native};
        this.selectedLang = name;    
        this.$emit('change', data);
        this.hide();
        this.setFlag(countries[0]);
      },
      toggle: function() {
        this.isOpen = !this.isOpen;
      },
      show: function() {
        this.isOpen = true;
      },
      hide: function() {
        this.isOpen = false;
      },
      scrollLeft : function(i) {
        let content = document.querySelector(".wrapper-box-"+i);
        content.scrollLeft -= 50;
      },
      scrollRight : function(i) {
        let content = document.querySelector(".wrapper-box-"+i);
        content.scrollLeft += 50;
      },
      setFlag : function(f)
      {
        this.selectFlag = f;
      }
    }
  }
</script>

<style>
@import './assets/css/style.css';
@import './assets/css/flags.min.css';
</style>