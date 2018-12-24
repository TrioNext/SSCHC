/*
- be used on reducer
- trigger
  1. socket activities update channel room :  using socket class intances object
  2. component re-render : using class intance object
*/

import userConf from '../config/user.conf';



export const onSubmitAndCloseModal = (res,_this)=>{

  if(typeof res.name  !== 'undefined'){
    const status = res.name ;
    if(status==='success'){
      //_this.app.onStateChange({onAction:_this.state.onAction,status:'success'});
      _this.toggle();

      if(_this.state.onAction==='post'){
        emptyForm(_this.form);
      }

    }
  }
}

export const emptyForm = (form)=>{

  Object.keys(form).map((item)=>{
    if(typeof form[item] ==='string'){
      form[item] = '';
    }
  });
}

export const emptyFormUser = (form={})=>{
  Object.keys(form).map((item)=>{
    if(typeof form[item] ==='string'){
      form[item] = '';
    }
  });

  form.password = userConf.defaultPass; /* reset defaultPass*/


}
