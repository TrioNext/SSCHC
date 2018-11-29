

class FormCtrl {

  constructor(app){

    this.active = false ; /* FOR OPEN MODAL */
    this.app = app ;

    this.state = {
      onAction:'',
      status:''
    }

    this.defaultValue = {

    }

    this.form = {
      code:'',
      name:''

    }

  }

  onSubmit(){

    const _this = this ;
    const onAction = this.state.onAction;

    this.app.model.axios(onAction,this.form,(res)=>{

          if(typeof res.name  !== 'undefined'){
            const status = res.name ;
            if(status==='success'){
              _this.app.onStateChange({status:status});
              _this.toggle();
            }
          }

      })

  }

  onChange(name, e){

    this.form[name] = e.target.value;

  }

  setState(name,value){

    this.state[name] = value ;
  }

  open(type, info){

    this.form = info || this.form;
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

      this.form = this.defaultValue;

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
        const id = this.parent.form.id;

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
