
import userConf from '../../../config/user.conf';


class userModalCtrl {

  constructor(app){

    this.active = false ; /* FOR OPEN MODAL */
    this.app = app ;

    this.state = {
      onAction:'',
      status:''
    }


    this.form = {
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

  emptyForm(){
    Object.keys(this.form).map((item)=>{
      if(typeof this.form[item] ==='string'){
        this.form[item] = '';
      }
    });

    this.form.password = userConf.defaultPass; /* reset defaultPass*/
  }

  /* kiem tra cac gia trị trong fields : empty or 0 */
  HookBefore(fields=[]){
    let ret = '' ;

    if(fields.length>0){

      Object.keys(this.form).map((item)=>{
        fields.map((item2)=>{
          if(this.form[item2] === '' ||  this.form[item2] === 0){
            ret = 'vui lòng kiểm tra thông tin ' ;
            document.getElementById(item2).focus();


          }

        });
      });
    }

    let el = document.getElementById('form-err');
    el.innerHTML = ret;
    return ret ;
  }
  onSubmit(){
    const _this = this ;
    const onAction = this.state.onAction;

    if(this.HookBefore(['position','username','job_level','department_id','job_type','office_id','phone','email','name'])===''){
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

    /* SET STATE CHANGE
    this.app.onStateChange({
      onAction:type,
      status:'modal opening'
    });*/





  }

  toggle(){

      this.active = !this.active;

      this.emptyForm();


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

          _this.parent.app.hook.success(_this.parent.app.state.onAction,res);

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

export default userModalCtrl
