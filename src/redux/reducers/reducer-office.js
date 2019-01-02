
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

import { toast } from '../../hook/after';

import { OFFICES } from '../../model/model-mode';
import { OFFICES_NAME } from '../../model/model-name';

const MODE = OFFICES;
const NAME = OFFICES_NAME;

const iniState = {
  list:[]
}


export default function(state = iniState ,action = {}){
  switch(action.type){


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
