
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

import afterPost from '../../hook/afterPost';

const MODE = 'offices';

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
    


    default:
      return state;

  }
};
