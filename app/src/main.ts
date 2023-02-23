// Vue
import App from "./App.vue";
import { createApp } from "vue";

// Modules
import { createPinia } from "pinia";
import router from "./router";

// Styles and Element UI framework
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./assets/main.css";

// Creating the Vue app
const app = createApp(App);

// Passing modules to the Vue app
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

// Initialize the Vue app
app.mount("#app");
