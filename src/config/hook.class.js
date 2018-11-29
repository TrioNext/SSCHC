
/*
HOOK :  TRIGGER AFFTER DONE WITH DATABASE
    - SAVE PRIVATE DATA
    - SAVE GLOBAL DATA
          on POST
          on PUT
          on DELETE

    -> TRIGGER FOR MAIN DATACHANGE
    -> TRIGGER ON ACTION GET ERROR
*/

class Hook {

  constructor(app){
    this.app = app;
  }

  success(onAction,idata){

      switch(onAction){
        case 'post':


        break;
        case 'put':

            if(idata.name==='success'){



            }else{ this.showErr(idata.message); }


        break;

        case 'delete':



        break;

      }


  }

  error(err){




  }
  showErr(msg){



  }
}

export default Hook ;
