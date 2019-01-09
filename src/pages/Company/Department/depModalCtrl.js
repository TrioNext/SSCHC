
import store from '../../../redux/store';
import { detectForm } from '../../../hook/before';



class FormCtrl {

  constructor(model){

    this.active = false ; /* FOR OPEN MODAL */

    this.state = {
      typeAction:'',
      onAction:'',
      status:''
    }

    this.data = {}

    // initial WHO
    this.model = model ;

  }

  _stateDataTemp(){
    return {
      code:'',
      name:''
    }
  }

  /* START WHEN */
  onSubmit(){


    const _this = this ;
    const typeAction = this.state.typeAction;


    if(detectForm(['code','name'],this.data)===''){
        this.model.axios(typeAction,this.data,(res)=>{
          // -->
          this._whereStateChange({
            onAction:'onSubmit',
            status:res.name
          });
        })
    }


  }

  onChange(name, e){

    Object.assign(this.data,{ [name]:e.target.value});
    this.processForm(name,e);

  }

  processForm(name,e){
    this._whereStateChange({
      onAction:'processForm'
    })
  }

  /* END WHEN  */

  /* START HOW */
  open(type, info){

    //const {temp} = info || FORM_TEMP ;
    this.data = info || this._stateDataTemp() ;
    this.active = true ;

    this._whereStateChange({
      typeAction:type,
      onAction:'open',
      status:'opened'
    });


    /* RE-RENDER COMPONENT */


  }

  toggle(){

      this.active = !this.active;
      this.popover.active =  false;
      // -->
      this._whereStateChange({
        onAction:'toggle_modal'
      })

  }
  /* END HOW  */

  /* START WHERE  */
  _whereStateChange(newState={}){

    Object.assign(this.state,newState);

    if(newState.status ==='success'){
      this.toggle()
    }else{

      //alert('FORM-'+this.model.model);

      store.dispatch({
        type:'STATE-'+this.model.model,
        state:this.state
      })
    }

  }

  /* END WHERE  */



  /* SMAIL OBJECT */
  popover = {
      active:false,

      parent:this,
      btnYes(){


        const id = this.parent.data.id;

        this.parent.model.delete(id,(res)=>{

            this.parent._whereStateChange({
              onAction:'btnYes',
              typeAction:'delete',
              status:res.name
            });

        })

      },

      toggle(){

         this.active = !this.active;
         this.parent._whereStateChange({
           onAction:'toggle_popover'
         })

      }
  }

}

export default FormCtrl
