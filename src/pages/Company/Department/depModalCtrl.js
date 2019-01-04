

import { detectForm } from '../../../hook/before';



class FormCtrl {

  constructor(app){

    this.active = false ; /* FOR OPEN MODAL */

    this.state = {
      onAction:'',
      status:''
    }

    this.data = {}

    this.form = {
      code:'',
      name:''
    }

    // initial WHO
    this.app = app ;

  }

  /* START WHEN */
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

  /* END WHEN  */

  /* START HOW */
  open(type, info){

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
  /* END HOW  */

  /* START WHERE  */
  setState(newState={}){

    /* update state*/
    Object.assign(this.state,newState);

    /* RE-RENDER COMPONENT*/
    this.app.onStateChange(this.state);


  }
  /* END WHERE  */



  /* SMAIL OBJECT */
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
