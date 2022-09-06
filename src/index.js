import Footer from './components/Footer';
import Header from './components/Header';
import ElementPage from './components/ElementPage';
import PageHeader from './components/PageHeader';
import SocialIcon from './components/SocialIcon';



export default {
    install(Vue) {
        Vue.component('footer', Footer);
        Vue.component('header', Header);
        Vue.component('elementPage', ElementPage);
        Vue.component('pageHeader', PageHeader);
        Vue.component('socialIcon', SocialIcon);
    },
};

export { Footer, Header, ElementPage, PageHeader, SocialIcon };