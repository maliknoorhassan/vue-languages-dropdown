import LanguageDropdown from "./LanguageDropdown.vue";

const VuePlugin = {
    install: function (Vue) {
        if (VuePlugin.installed) {
            return;
        }
        VuePlugin.installed = true;
        Vue.component('language-dropdown', LanguageDropdown);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
}

export default VuePlugin