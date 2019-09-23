import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

export default {
    name: 'app',
    data () {
      return {
        message: 'Welcome to Vue.js',
        static: [
          { name: 'test' }, { name: 'hello' }, { name: 'I\'m static'}
        ],
        dynamic: []
      }
    },
    methods: {
      addStatic: function(e) {
        this.static.push({name: ''})
      }
    }
  }
