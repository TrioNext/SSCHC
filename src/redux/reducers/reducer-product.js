
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}

nhật ký : thu - chi : từ tài khoản
*/

import { toast } from '../../hook/after';


import { PRODUCTS } from '../../model/model-mode';
import { PRODUCT_NAME } from '../../model/model-name';



const MODE = PRODUCTS;
const NAME = PRODUCT_NAME;

const iniState = {
  mode:MODE,
  name:NAME,
  state:{},
  list:[]
}

export default function(state = iniState ,action = {}){

  switch(action.type){


    case 'STATE-'+MODE:
      return {
        ...state,
        state:action.state

      }
    break;

    /* PROACTIVE : DATA */
    case 'GET-'+MODE:

      return {
        ...state,
        list:action.list
      }

    break ;

    case 'POST-'+MODE:

      toast('post',msg);

      return {
        ...state,
        list:action.list
      }

    break ;

    case 'PUT-'+MODE:

      const msg = NAME;

      toast('put',msg);

      //console.log(action.res);


      return {
        ...state,
        list:action.list
      }

    break ;

    case 'DELETE-'+MODE:

      toast('delete',msg);

      return {
        ...state,
        list:action.list
      }

    break ;

    /* PASSIVE DATA : realtime received on listenServer  */
    case 'reset-'+MODE:

      console.log(action.list);

      return {
        ...state,
        list:action.list
      }
    break ;


    default:

      return state;

  }
};
