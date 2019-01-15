
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/


import { myToast } from '../../hook/after';


import { INVENTORY_TRACKS } from '../../model/model-mode';
import { INVENTORY_TRACK_NAME } from '../../model/model-name';


const MODE = INVENTORY_TRACKS;
const NAME = INVENTORY_TRACK_NAME;

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

      myToast('post',state)

      return {
        ...state,
        list:action.list
      }

    break ;

    case 'PUT-'+MODE:

      myToast('put',state);


      return {
        ...state,
        list:action.list
      }

    break ;

    case 'DELETE-'+MODE:


      myToast('delete',state);


      return {
        ...state,
        list:action.list
      }

    break ;

    /* PASSIVE DATA : realtime received on listenServer  */
    case 'reset-'+MODE:

      return {
        ...state,
        list:action.list
      }
    break ;


    default:

      return state;

  }
};
