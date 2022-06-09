import { createRouter, createWebHistory } from 'vue-router';

// import views
import HomePage from './views/HomePage.vue';
import LoginPage from './views/LoginPage.vue';
import RegisterPage from './views/RegisterPage.vue';
import ChooseContentPage from './views/ChooseContentPage.vue';
import CreateArticlePage from './views/CreateArticlePage.vue';
import ArticlePage from './views/ArticlePage.vue';
import ProfilePage from './views/ProfilePage.vue';
import ActivityLogPage from './views/ActivityLogPage.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/Login',
      component: LoginPage,
    },
    {
      path: '/Register',
      component: RegisterPage,
    },
    {
      path: '/myContent',
      component: ChooseContentPage,
    },
    {
      path: '/createNewArticle',
      component: CreateArticlePage,
    },
    {
      path: '/Article/:id',
      component: ArticlePage,
    },
    {
      path: '/profilePage/:username',
      component: ProfilePage,
    },
    {
      path: '/activityLog/:username',
      component: ActivityLogPage
    }
  ],
});
