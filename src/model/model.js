
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


import server from '../config/server';
import axios from 'axios';


class Model {


  constructor(model){

    this.model = model; // string

    this.data = [];
    this.status = {}; /* keep context data on doing POST - PUT  */
    this.type = ''; /* type : http: method */



    this.setting = {
      url:'',
      base:server.base() + '/'+ this.model+'?',
      config:'',
      paginate:server.paginate,
      total:0
    };

    this.setup();


  }


  setup(){

    let  url = this.setting.base +   Object.keys(this.setting.paginate).map((key)=>{
        return key +'='+ this.setting.paginate[key]
    }).join('&');

    this.setting.url = url;
    this.setting.config = server.setHeader();

    this.setData(this.model,[]);

  }

  set(name,value){
    this.setting[name] = value;
    this.setup();
  }
  get(name){
    return this.setting[name];

  }

  setData(name,list){
     this.data[name] = list;
  }
  getData(name){
    name = name || this.model;
    return this.data[name];
  }

  setItemData(name,json){

    const list = this.getData();
    list.unshift(json);
    this.setData(name,list);

  }

  updateItemData(name,id,json){

    const list = this.data[name];

    list.map((item,index)=>{

      if(parseInt(item.id) === parseInt(id)){
         list[index] = json;
      }

      return list;

    });



  }

  getItemData(name,id){
    let info = {};
    this.data[name].map((item)=>{
      if(item.id===id){
        info = item;
      }
    })

    return info ;
  }

  delItemData(name,id){

    let list = this.data[name].filter((item)=>{
      return parseInt(item.id) !== parseInt(id);
    });

    this.setData(name,list);


  }

  axios(method,data={},onSuccess){

    switch (method) {
      case 'post':
          this.post(data,onSuccess);
      break;
      case 'put':
          const id = data.id;
          delete data.id ;
          this.put(id,data,onSuccess);
      break;


    }

  }

  delete(id,onSuccess){

      this.type = 'DELETE';
      const url = server.base() + '/' + this.model+'/'+id ;

      axios.delete(url,this.setting.config)
            .then((res)=>{
              this.onSuccess(res);
              onSuccess(res.data)
            },(error)=>{
              this.onError(error)

            })


  }

  post(data,onSuccess){

    this.type = 'POST';
    this.status = data ;


    const url = server.base()+ '/' + this.model;

    axios.post(url,data,this.setting.config)
          .then((res)=>{
            this.onSuccess(res);
            onSuccess(res.data)
          },(error)=>{

            this.onError(error);

          });

  }

  put(id,data,onSuccess){

      this.type = 'PUT';
      this.status = data ;

      const url = server.base() + '/' + this.model + '?id='+id;

      axios.put(url,data,this.setting.config)
            .then((res)=>{
              this.onSuccess(res);
              onSuccess(res.data)
            },(error)=>{

              this.onError(error)

      })

  }


  goto(p=0,onSuccess){
    const {url, config, paginate, total } = this.setting ;

    let offset = 0 ;
    offset = parseInt(paginate.max) * (p);

    this.set('paginate',Object.assign(paginate,{
      offset:offset,
      p:p
    }));

    this.get((res)=>{
      this.onSuccess(res);
      onSuccess(res);
    },(err)=>{
      this.onError(err);

    });
  }
  pre(onSuccess){

    const {url, config, paginate,total} = this.setting ;
    let next = paginate.p - 1;

    next = next < 0 ? 0 : next ;

    let offset = 0 ;
    let page = next ;
    let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));

    offset = parseInt(paginate.max) * (page);


    this.set('paginate',Object.assign(paginate,{
      offset:offset,
      p:next
    }));

    this.get((res)=>{

      this.onSuccess(res);
      onSuccess(res);
    },(err)=>{

      this.onError(err);

    });

  }
  next(onSuccess){

      const {url, config, paginate, total } = this.setting ;
      let next = paginate.p + 1;


      let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));
      next = next < pages ? next : pages - 1 ;

      let offset = 0 ;
      let page = next ;

      offset = parseInt(paginate.max) * (page);


      this.set('paginate',Object.assign(paginate,{
        offset:offset,
        p:next
      }));


      this.get((res)=>{

        this.onSuccess(res);
        onSuccess(res);
      },(err)=>{
        this.onError(err);

      });


  }


  /* SET TOTAL - SAVE MOBX PERSIST*/
  onSuccess(res){


      //this.set('total',list.count);

      const idata = res.data || {};

      switch(this.type){

        case 'GET':

          this.set('total',res.count);
          this.setData(this.model,res.rows);


        break;

        case 'POST':


          idata.name === 'success' ?   this.setItemData(this.model,idata.data) :  this.showErr(idata.message);


        break;

        case 'PUT':

            const {id} = idata.condition.where;
            let json = this.status ;
            Object.assign(json,{id:id});


            idata.name === 'success' ? this.updateItemData(this.model,id,json) : this.showErr(idata.message);



        break;

        case 'DELETE':
            idata.name === 'success' ? this.delItemData(this.model,idata.id) : this.showErr(idata.message);



        break;
      }


  }

  /* write log error*/
  onError(err){
    const data = err.response.data ;
    const msg = data.errors[0];

    this.showErr(msg);
  }

  showErr(msg){
    if(typeof msg === 'object'){
      msg = msg.message.indexOf('must be unique') >-1 ? 'Mã này đã được dùng' : msg.message ;
    }

    let el = document.getElementById('form-err');

    if(el !== null){
      el.innerHTML = msg;
      setTimeout(()=>{
        el.innerHTML = 'status';
      },2000)
    }else{

      console.log(msg);
    }
  }

  get(onSuccess){

      this.type = 'GET';

      const _this = this ;
      const {url, config} = this.setting ;



      axios.get(url,config)
            .then((res) => {


              this.onSuccess(res.data);
              onSuccess(res.data)


            },
            (error) => {
                var status = error.response.status;
                this.onError(error)

              }
            );
  }



}

export default Model
