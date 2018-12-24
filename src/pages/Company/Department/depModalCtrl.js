

import hookBefore from '../../../hook/beforePost';
import { emptyForm,onSubmitAndCloseModal } from '../../../hook/afterPost'

class FormCtrl {

  constructor(app){

    this.active = false ; /* FOR OPEN MODAL */
    this.app = app ;

    this.state = {
      onAction:'',
      status:''
    }

    this.data = {}

    this.form = {
      code:'',
      name:''

    }

  }

  onSubmit(){


    const _this = this ;
    const onAction = this.state.onAction;


    const data = onAction === 'post' ? this.form : this.data;

    if(hookBefore(['code','name'],data)===''){
        this.app.model.axios(onAction,data,(res)=>{

          onSubmitAndCloseModal(res,_this);

        })
    }





  }

  onChange(name, e){

    if(this.state.onAction==='post'){
        this.form[name] = e.target.value;
    }else{  this.data[name] = e.target.value;  }




  }

  setState(name,value){

    this.state[name] = value ;

  }

  open(type, info){

    //this.form = info || this.form;

    const temp = info || {} ;
    this.data = temp ;
    this.active = true ;

    this.setState('onAction',type);


    // SET STATE CHANGE
    this.app.onStateChange({
      onAction:type,
      status:'modal opening'
    });

  }

  toggle(){

      this.active = !this.active;

      //emptyForm(this.form);


      this.app.onStateChange({
        onAction:'',
        status:'close modal'
      });

      this.popover.active = false;

  }

  popover = {
      active:false,

      parent:this,
      btnYes(){

        const _this = this ;
        const id = this.parent.data.id;

        this.parent.app.onStateChange({
          onAction:'delete',
          status:'on comfirm delete..'
        });

        this.parent.app.model.delete(id,(res)=>{

           if(typeof res.name !== 'undefined'){
             if(res.name==='success'){
               _this.parent.app.onStateChange(res.name);
               _this.parent.toggle();
             }
           }
        })

      },

      toggle(){

         this.active = !this.active;

         this.parent.app.onStateChange({
           status:'toggle popover'
         });

      }
  }
}

export default FormCtrl
