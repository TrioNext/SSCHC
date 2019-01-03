

import { detectForm } from '../../../hook/before';



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

    if(detectForm(['code','name'],data)===''){
        this.app.model.axios(onAction,data,(res)=>{


          if(res.name==='success'){
            _this.toggle();
          }


        })
    }


  }

  onChange(name, e){

    if(this.state.onAction==='post'){
        this.form[name] = e.target.value;
    }else{  this.data[name] = e.target.value;  }




  }

  setState(newState={}){

    /* update state*/
    Object.assign(this.state,newState);

    /* RE-RENDER COMPONENT*/
    this.app.onStateChange(this.state);


  }

  open(type, info){

    //this.form = info || this.form;

    const temp = info || {} ;
    this.data = temp ;
    this.active = true ;


    /* RE-RENDER COMPONENT */
    this.setState({
      onAction:type,
      status:'success'
    });


  }

  toggle(){

      this.active = !this.active;

      this.setState({
        onAction:'',
        status:'close modal'
      })

      this.popover.active = false;

  }

  popover = {
      active:false,

      parent:this,
      btnYes(){

        const _this = this ;
        const id = this.parent.data.id;

        this.parent.app.model.delete(id,(res)=>{


            if(res.name==='success'){
              _this.parent.toggle();
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
