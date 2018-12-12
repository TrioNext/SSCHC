
/*
action = {
  type:'ACTION_TYPE',
  model:Model,
  data:{}
  id:0
}

II. REDUX :

	2. Reducers : store  : COMUNICATE : model - socket
		- Store data for  :
			=> Model method : cached locally
			=> Socket mehod : cached locally

			<= Recieve data : on Model respone
			<= Recieve data : on Socket respone

*/

const reducerUser = (state=[], action={})=>{
    switch(action.type){
      case 'FETCH':
          alert('fetch data from redux user');
          
          return state;
      break ;

      default :
        return state
    }
}

export default reducerUser;
