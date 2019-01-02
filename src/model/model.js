
/* MODEL NÀY CÓ THỂ KẾT NỐI VỚI REDUX - MOBX để luu cache database dùng lại*/

/*
MODEL : MAKE RESFUL API

    TRIGGER AFFTER DONE WITH DATABASE
    - SAVE PRIVATE DATA
    - SAVE GLOBAL DATA
          on POST
          on PUT
          on DELETE

    -> TRIGGER FOR MAIN DATACHANGE
    -> TRIGGER ON ACTION GET ERROR
*/


import store from '../redux/store';
import LocalData from './localData';


class Model {


  constructor(model){


    this.model = model; // string

    this.data = [];
    this.status = {}; /* keep context data on doing POST - PUT  */
    this.type = ''; /* type : http: method */
    this.res = {};

    this.localData = new LocalData(this.model);

    this.initData();

  }

  initData(){
    this.startSocket();
    this.listenDataChange();

    this.data = this.localData.list;
  }

  /* LISTENING DATACHANGE FROM LOCALDATA RESFUL*/
  listenDataChange(){

    this.localData.listenDataChange((res)=>{

      store.dispatch({
        type:this.localData.db.type+'-'+this.model,
        list:res.list,
        res:res.res
      });

    })
  }
  /* start listen to socket server -> save LocalData -> send to reducers
    tren cung 1 may tinh se ko cap nhat socket realtime
  */
  startSocket(){

    const _this = this ;
    /*  START REALTIME  */
    this.localData.listenServer((res)=>{

       if(_this.localData.jwt !== res.token){
         /* UPDATE LOCAL DATA */

         const idata = res.data ;

         let list = _this.localData.get();

         switch(res.type){

           case 'create':

              list.unshift(res.data);


           break ;
           case 'update':

              list.map((item,index)=>{

                if(parseInt(item.id) === parseInt(idata.id)){
                   list[index] = idata;
                }
              });


           break;
           case 'remove':

              list = list.filter((item) => {
                return parseInt(item.id) !== parseInt(idata.id)
              });

           break ;

         }
         _this.localData.set(list);

         /* SEND TO REDUCER NEW LIST  */
         store.dispatch({
           type:'reset-'+res.model,
           list:list,
           res:res
         });

       }

     });
  }

  set(name,value){
    this.localData.resetConfigDB(name,value);
  }


  getData(name){
    name = name || this.model;
    return this.data[name];
  }



  axios(method,data={},onSuccess){

    switch (method) {
      case 'post':
          this.post(data,onSuccess);
      break;
      case 'put':

          const id = data.id;
          this.put(id,data,onSuccess);
      break;

    }

  }

  delete(id,onSuccess){

      this.localData.delete(id,(res)=>{
        this.listenDataChange();
        onSuccess(res)
      });

  }

  post(data,onSuccess){

    this.localData.post(data,(res)=>{
      this.listenDataChange()
      onSuccess(res.data);
    })

  }

  put(id,data,onSuccess){


      const _this = this ;
      this.localData.put(id,data,(res)=>{
          _this.listenDataChange();
          onSuccess(res);

      })

  }


  goto(p=0,onSuccess){

    this.localData.goto(p,(res)=>{
      this.listenDataChange();
      onSuccess(res);
    })

  }

  pre(onSuccess){

    this.localData.pre((res)=>{
      this.listenDataChange();
      onSuccess(res);
    })

  }
  next(onSuccess){

      this.localData.next((res)=>{

        this.listenDataChange();
        onSuccess(res);
      })

  }


  load(){

    this.localData.data.length === 0 ? this.localData.fetch((res)=>{ this.listenDataChange(); }) : this.listenDataChange();;

  }
  get(onSuccess){

      this.type = 'GET';

      const _this = this ;

      this.localData.fetch((res)=>{
        this.listenDataChange();
        onSuccess(res.data)
      })


  }

}

export default Model
