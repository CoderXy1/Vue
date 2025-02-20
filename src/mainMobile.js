import { createApp } from 'vue';
import App from './components/Mobile/AppMobile.vue';
import routerMobile from '@/router/routerMobile';
import 'vant/es/dialog/style';
import 'vant/es/toast/style';
import 'vant/lib/index.css';
// 引入Font Awesome核心库
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//import Vant from 'vant'; 全部引用
import { Button,Swipe, SwipeItem,Image as VanImage } from 'vant';
import { Tabbar,TabbarItem,NavBar,Grid, GridItem,Col, Row,Tab,Tabs,PullRefresh,List,Cell,Sticky,Icon,ImagePreview } from 'vant';
import { ActionSheet,Uploader,Form,Field,CellGroup,Toast,Dialog,Popup,Search,SwipeCell,TextEllipsis,BackTop,DropdownMenu,
    DropdownItem,Switch } from 'vant';
import { Calendar,Tag,Rate,RadioGroup, Radio,Stepper } from 'vant';

// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

library.add(fas);

const app = createApp(App);
app.use(routerMobile);
app.use(Button).use(Swipe).use(SwipeItem).use(VanImage);
app.use(Tabbar).use(NavBar).use(TabbarItem).use(Grid).use(GridItem).use(Col)
    .use(Row).use(Tab).use(Tabs).use(PullRefresh).use(List).use(Cell).use(Sticky).use(Icon).use(ImagePreview);
app.use(ActionSheet).use(Uploader).use(Form).use(Field).use(CellGroup).use(Toast).use(Dialog).use(Popup)
    .use(Search).use(SwipeCell).use(TextEllipsis).use(BackTop).use(DropdownMenu).use(DropdownItem).use(Switch);
app.use(Calendar).use(Tag).use(Rate).use(RadioGroup).use(Radio).use(Stepper);
app.component('font-awesome-icon',FontAwesomeIcon);

app.mount('#app');

