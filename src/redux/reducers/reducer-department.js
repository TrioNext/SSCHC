
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

import { toast } from '../../hook/after';

import { DEPARTMENTS } from '../../model/model-mode';
import { DEPARTMENTS_NAME } from '../../model/model-name';


const MODE = DEPARTMENTS;
const NAME = DEPARTMENTS_NAME;

const iniState = {
  list:[]
}

export default function(state = [],action = {}){



  switch(action.type){


    /* PROACTIVE : DATA */
    case 'GET-'+MODE:

      return {
        ...state,
        list:action.list
      }

    break ;

    case 'POST-'+MODE:


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


      return {
        ...state,
        list:action.list
      }

    break ;

    /* PASSIVE DATA : realtime received on listenServer  */
    case 'reset-'+MODE:

      console.log(action.res);
      return {
        ...state,
        list:action.list
      }
    break ;


    default:

      return state;

  }
};
