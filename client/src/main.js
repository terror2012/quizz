import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import UserServices from '@/services/UserServices.js'

Vue.config.productionTip = false

const protected_links = ['/admin', '/add_quiz', '/manage_quiz', '/categories', '/solutions', '/questions']

const session = Vue.prototype.$session;

router.beforeEach(async function (to, from, next) {
  console.log(to.path)
  if(protected_links.includes(to.path))
  {
    if(!session.has('user'))
    {
      let session_response = await UserServices.check_session();
      if(session_response.data.status === "success")
      {
        session.set('user', session_response.data.message)
      }
      else{
        next({path: '/login'})
      }
    }
    else
    {
      next()
    }
  }
  else
  {
    next()
  }
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
