
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

import afterPost from '../../hook/afterPost';

const MODE = 'departments';


const iniState = {
  list:[]
}

export default function(state = [],action = {}){
  switch(action.type){


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


    default:
      return state;

  }
};
