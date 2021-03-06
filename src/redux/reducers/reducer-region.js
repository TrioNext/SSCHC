
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/



const MODE = 'regions';
const NAME = 'Tỉnh/Thành';

const iniState = {
  list:[]
}


export default function(state = iniState,action = {}){

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



      return {
        ...state,
        list:action.list
      }
    break ;


    default:

      return state;

  }

};
