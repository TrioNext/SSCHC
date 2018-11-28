
/*
HOOK :  TRIGGER AFFTER DONE WITH DATABASE
    - SAVE PRIVATE DATA
    - SAVE GLOBAL DATA
          on POST
          on PUT
          on DELETE

    -> TRIGGER FOR MAIN DATACHANGE
    -> TRIGGER ON ACTION GET ERROR
*/

class Hook {

  constructor(app){
    this.app = app;
  }

  success(onAction,idata){

      switch(onAction){
        case 'post':

            if(idata.name==='success'){


              const list = this.app.data.list;
              list.unshift(idata.data);

              this.app.onDataChange(list);
              this.app.modal.toggle();

            }else{

                this.showErr(idata.message);

            }


        break;
        case 'put':

            if(idata.name==='success'){

              const {id} = idata.condition.where;
              const list = this.app.data.list;

              Object.assign(this.app.modal.form,{id:id});

              list.map((item,index)=>{

                if(parseInt(item.id) == parseInt(id)){
                   list[index] = this.app.modal.form;
                }
              });

              
              this.app.onDataChange(list);
              this.app.modal.toggle();

            }else{ this.showErr(idata.message); }


        break;

        case 'delete':

            if(idata.name==='success'){

               let list = this.app.data.list.filter((item)=>{
                 return parseInt(item.id) !== parseInt(idata.id);
               });

               this.app.onDataChange(list);
               this.app.modal.toggle();

            }else{ this.showErr(idata.message); }

        break;

      }


  }

  error(err){


      const data = err.response.data ;
      const msg = data.errors[0];

      this.showErr(msg);

  }
  showErr(msg){

      if(typeof msg === 'object'){
        msg = msg.message.indexOf('must be unique') >-1 ? 'Mã này đã được dùng' : msg.message ;
      }

      let el = document.getElementById('form-err');

      if(typeof el ==='object'){
        el.innerHTML = msg;
        setTimeout(()=>{
          el.innerHTML = 'status';
        },2000)
      }else{
        alert('Đã xãy ra lỗi')
        console.log(msg);
      }

  }
}

export default Hook ;
