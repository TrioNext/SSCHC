/*
FUNCTION FOR EASY CALLING

*/

export default function(fields=[],form={}){

  let ret = '' ;

  if(fields.length>0){

    fields = fields.reverse();

    Object.keys(form).map((item)=>{
      fields.map((item2)=>{
        if(form[item2] === '' ||  form[item2] === 0){
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
