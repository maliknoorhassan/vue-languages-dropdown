<template>
  <div class="languages-dropdown-container">
  
     <div class="dropdown">
    <button v-on:click="toggle" class="dropbtn" :style="mapCustomCss">
        <div class="selected-lang-text">
            <i v-bind:class="'flag flag-'+selectFlag"></i> {{selectedLang}}
        </div>
    </button>
    <input type="search" placeholder="Search.." class="search-input" ref="searchInput" v-model="search" autocomplete="off" v-bind:class="{show : isOpen}" v-if="this.showSearchInput">
    <div id="myDropdown" class="dropdown-content" v-bind:class="{show : isOpen, hide : !isOpen}" style="overflow-x: hidden;">

      <div class="wrapper">

        <a v-if="filteredLanguages.length == 0">
        <div class="language-item">
             <div  class="text-center"><span>No result found.</span></div>
        </div>
        </a>

      <a v-for="(c,i) in filteredLanguages" v-on:click="onLanguageChange(c.code,c.name,c.nativeName,c.countries)">
        <div  class="float-left lang-item">
            <span v-if="displayText=='name'"> {{c.name}}</span>
            <span v-if="displayText=='native'">{{c.nativeName}}</span>
        </div>

         <div class="right-container">
            <div v-on:click="scrollLeft(i)" class="scroll-btn float-left">«</div>

        <div class="wrapper-box" v-bind:class="'wrapper-box-'+i">
          <span v-for="f in c.countries" class="mr-5"><i v-bind:class="'flag flag-'+f"></i></span>
        </div>

         <div v-on:click="scrollRight(i)" class="scroll-btn float-right">»</div>

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
    name     : "LanguagesDropdown",
    props: {
      showSearchInput :{
        type    : Boolean,
        default : true
      },
      selected: {
        type: String,
        required: true
      },
      btnBgColor :{
        type : String,
        default : '#ed4c46'
      },
      btnFontColor:{
        type : String,
        default : '#fff'
      },
      displayText : {
        type : String,
        default : 'name',
        validator(text) {
          return ['name', 'native'].includes(text);
        },
      },
      selectedLanguages : {
        type : Array,
        default : ()=> []
      }
    },
    mounted()
    {
      let index         = this.languages.map(function (lang) { return lang.code; }).indexOf(this.selected.toLowerCase());
      let userIsoCode   = this.languages[index]['name'];    
      this.selectedLang = userIsoCode;
      this.selectFlag   = this.languages[index]['countries'][0];
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
      mapCustomCss ()
      {
        return{
          'background-color' : this.btnBgColor,
          'color' : this.btnFontColor
        }
      },
      getOnlySelectedLanguages : function()
      {
        var self = this;
        return this.languages.filter(function(lang){
           return lang.code == self.selectedLanguages[self.selectedLanguages.indexOf(lang.code)]
        })
      },
      filteredLanguages:function()
      {
        let self = this;
        let data = this.getOnlySelectedLanguages.length > 0 ? this.getOnlySelectedLanguages : this.languages;
        return data.filter(function(lang){
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
        let data          = { 'code' : code, 'name' : name, 'native' : native, 'countries' : countries};
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

<style scoped>
@import './assets/css/style.css';
@import './assets/css/flags.min.css';
</style>