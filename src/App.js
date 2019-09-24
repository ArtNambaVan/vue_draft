import Vue from 'vue';
import ElementUI from 'element-ui';

Vue.use(ElementUI);

export default {
    name: 'app',
    data () {
      return {
        dataForDynamic: [[{id: 'a1'}, {id: 'a222'}], {id: 'a2'}, {id: 'a3'}],
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
      },
      addDynamic: function(e) {
        console.log(this.dynamic)
        this.dataForDynamic.push({id: 'ew'})
      },
      createObj: function() {
        return {name: 'dynamic test'};
      },
      createDynamic: function(item) {
        const items = this.dynamic;
        if (item.length) {
          console.log('yea')
          item.forEach(e => {
            console.log(e.id)
            items[e.id] = [{name: 'dsad231'}]
          })
        } else {
          items[item.id] = [{name: 'dsad'}]
        }
        
        //console.log(items[item.id])
        return items[item.id]
      }
    }
  }
