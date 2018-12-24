
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

import afterPost from '../../hook/afterPost';
import { DEPARTMENTS } from '../../model/model-mode';



const iniState = {
  list:[]
}

export default function(state = [],action = {}){
  switch(action.type){


    case 'GET-'+DEPARTMENTS:


      return {
        ...state,
        list:action.list
      }

    break ;

    case 'POST-'+DEPARTMENTS:
      
      return {
        ...state,
        list:action.list
      }

    break ;

    case 'PUT-'+DEPARTMENTS:



      return {
        ...state,
        list:action.list
      }

    break ;

    case 'DELETE-'+DEPARTMENTS:


      return {
        ...state,
        list:action.list
      }

    break ;


    default:
      return state;

  }
};
