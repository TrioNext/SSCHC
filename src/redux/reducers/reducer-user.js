
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

const MODE = 'user';

export default function(state = [],action = {}){
  switch(action.type){


    case 'set-'+MODE:
      state = action.list ;
      return state ;
    break ;

    case 'SET':

      state = action.list ;
      return state ;

    break ;

    case 'get-'+MODE:

       let ret = {};
      state.map((item)=>{
        if(parseInt(item)===action.id){
          ret = item;
        }
      });

      return ret ;
    break;

    case 'push-'+MODE:
      return state ;
    break;

    case 'delete-'+MODE  :
      return state ;
    break;


    default:
      return state;

  }
};
