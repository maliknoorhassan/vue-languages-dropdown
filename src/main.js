import DropDown from "./Dropdown.vue";

const VuePlugin = {
    install: function (Vue) {
        if (VuePlugin.installed) {
            return;
        }
        VuePlugin.installed = true;
        Vue.component(DropDown.name, DropDown);
    }
};

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VuePlugin);
}

export default VuePlugin