
import userConf from '../../../config/user.conf';
import store from '../../../redux/store';

import { detectForm } from '../../../hook/before';


class userModalCtrl {

  constructor(model){

    this.active = false ; /* FOR OPEN MODAL */

    this.state = {
      typeAction:'',
      onAction:'',
      status:''
    }

    this.model = model ;

  }

  _stateDataTemp(){
    return {
      name:'',
      password:userConf.defaultPass,
      gender:1,
      email:'',
      phone:'',
      office_id:0,
      job_type:2,
      department_id:0,
      job_level:2,
      username:'', /* ID NỘI BỘ*/
      position:'',
      is_limit_ip_chamcong:0
    }
  }

  onSubmit(){

    const typeAction = this.state.typeAction; /* PUT - POST */

    /* HOOKED detectForm before save data*/
    // -->
    const fields = [
      'name','email','phone','office_id',
      'department_id','username','position'
    ];

    if(detectForm(fields,this.data)===''){

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

    //this.data[name] = e.target.value;
    // --> initial HOW -> WHERE
    this.processForm(name,e);

  }


  open(typeAction, info){



    //const {temp} = info || FORM_TEMP ;
    this.data = info || this._stateDataTemp() ;
    this.active = true ;


    this._whereStateChange({
      typeAction:typeAction,
      onAction:'open',
      status:'opened'
    });



  }

  /* START : HOW */
  processForm(name,e){
     //-->
     this._whereStateChange({
       onAction:'processForm'

     });

     console.log(this.data);
  }


  toggle(){

    this.active = !this.active;
    this.popover.active =  false;

    // -->
    this._whereStateChange({
      onAction:'toggle_modal'
    })


  }

  /* START : WHERE */
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

export default userModalCtrl
