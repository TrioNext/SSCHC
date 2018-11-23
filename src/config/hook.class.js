
/*
Hooks require
  app class OBJECT
    data = {
      id:0,
      list:[]
    }

    onDa

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


                let el = document.getElementById('form-err');
                el.innerHTML = idata.message;



            }


        break;
        case 'put':

            if(idata.name==='success'){

              const {id} = idata.condition.where;
              const list = this.app.data.list;

              list.map((item,index)=>{

                if(item.id == id){
                   list[index] = item;
                }
              })

              this.app.onDataChange(list);
              this.app.modal.toggle();

            }else{

              let el = document.getElementById('form-err');
              el.innerHTML = idata.message;
            }


        break;

        case 'delete':

            if(idata.name==='success'){

               let list = this.app.data.list.filter((item)=>{
                 return parseInt(item.id) !== parseInt(idata.id);
               });

               //this.app.data.list = list ;
               //alert(JSON.stringify(list));

               this.app.onDataChange(list);
               this.app.modal.toggle();
            }

        break;

      }


  }

  error(err){


      const data = err.response.data ;
      const msg = data.errors[0];

      this.showErr(msg);

  }
  showErr(msg){

      const _this = this ;
      msg = msg.message.indexOf('must be unique') >-1 ? 'Mã này đã được dùng' : msg.message ;


      let el = document.getElementById('form-err');
      el.innerHTML = msg;





  }
}

export default Hook ;
