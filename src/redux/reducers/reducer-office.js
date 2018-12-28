
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/


import { OFFICES } from '../../model/model-mode';

const MODE = OFFICES;
const iniState = {
  list:[]
}


export default function(state = [],action = {}){
  switch(action.type){


    case 'GET-'+MODE:
      state = action.list ;
      return state ;

    break ;

    case 'POST-'+MODE:
      state = action.list ;
      return state ;

    break ;

    case 'PUT-'+MODE:
      state = action.list ;
      return state ;

    break ;

    case 'DELETE-'+MODE:
      state = action.list ;
      return state ;

    break ;

    /* PASSIVE DATA : realtime received on listenServer  */
    case 'reset-'+MODE:

      alert('something change');
      return {
        ...state,
        list:action.list
      }
    break ;



    default:
      return state;

  }
};
