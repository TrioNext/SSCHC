/*
- be used on reducer
- trigger
  1. socket activities update channel room :  using socket class intances object
  2. component re-render : using class intance object

  toast.success("Hello", options) // add type: 'success' to options
  toast.info("World", options) // add type: 'info' to options
  toast.warn(<Img />, options) // add type: 'warning' to options
  toast.error(<Img />, options) // add type: 'error' to options
  toast.dismiss() // Remove all toasts !

*/

import userConf from '../config/user.conf';

import { toast } from "react-toastify";


const successMsg = {
  "post":"Đã tạo thành công",
  "put":"Đã cập nhật thành công",
  "delete":"Đã xoá thành công"
}


export const updateItemData = (newData,list) =>{

  return list.map((item,index)=>{

    if(parseInt(item.id) === parseInt(newData.id)){
       list[index] = newData;
    }
  });

}


export const removeItemData = (id,list) =>{


  return list.map((item,index)=>{
      if(parseInt(item.id) === parseInt(id)){
        delete list[index]
      }

  });
  

}

export const setItemData = (newData,list)=>{
  list.unshift(newData);
  return list;
}

export const toastSuccess = (type)=>{

   const msg = successMsg[type]
   toast.success(msg);
}

/* USING ON CONTROLLER MODAL ONLY*/
export const onSubmitAndCloseModal = (res,_this)=>{

  if(typeof res.name  !== 'undefined'){
    const status = res.name ;
    if(status==='success'){
      //_this.app.onStateChange({onAction:_this.state.onAction,status:'success'});

      /* refesh parent component*/
      _this.setState({
        onAction:_this.state.onAction,
        status:'success'
      })


      emptyForm(_this.form);
      toastSuccess(_this.state.onAction);

      /* CLOSE MODAL FORM*/
      _this.toggle();


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
