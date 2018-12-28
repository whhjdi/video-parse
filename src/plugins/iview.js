import Vue from "vue";
import {
  Button,
  Select,
  Input,
  Option,
  Notice,
  Icon,
  Poptip,
  Alert
} from "iview";

Vue.component("Button", Button);
Vue.component("Select", Select);
Vue.component("Option", Option);
Vue.component("Input", Input);
Vue.component("Icon", Icon);
Vue.component("Poptip", Poptip);
Vue.component("Alert", Alert);
import "iview/dist/styles/iview.css";
Vue.prototype.$Notice = Notice;
