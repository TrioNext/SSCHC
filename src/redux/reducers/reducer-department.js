
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}
*/

export default function(state = [],action = {}){
  switch(action.type){


    case 'FETCH':
        //alert('fetch data from redux');



        return state;
    break;
    case 'SET':

      state = action.list ;
      return state ;

    break ;

    case 'GET':

       let ret = {};
      state.map((item)=>{
        if(parseInt(item)===action.id){
          ret = item;
        }
      });

      return ret ;
    break;

    case 'POST':
      return state ;
    break;

    case 'PUT':

    break;

    case 'DELETE':

    break ;

    default:
      return state;

  }
};
