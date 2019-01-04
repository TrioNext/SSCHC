
/*
-> clear all data
    --> load and store data
        --> auto update data via : socket
            --> send to reducer
*/

import Socket from './socket';

import server from '../config/server';
import axios from 'axios';

import isExisted from '../hook/before';


class LocalData {

  constructor(model){

    this.model = model;

    this.data = [] ;
    this.state = {};
    this.res = {};

    /* initial : WHO */
    this.setup(model);

  }

  setup(model){
    /*socket*/
    this.socket = new Socket(model);

    /*database*/
    this.db = {
      type:'GET',
      url:'',
      base:server.base() + '/'+ this.model+'?',
      config:'',
      paginate:server.paginate,
      total:0
    };
    this.configDB();

    /* init default data : token info*/
    this.initData();


  }


  /********WHEN *********** */
  /* SOCKET*/
  onSocketTick(onStateChange){
    const _this = this ;

    this.socket.clientListenServer((res)=>{

        this.socketResp(res);

        // --> callback()
        onStateChange(res,this.list);

    })
  }
  /********END WHEN *********** */

  /***********HOW**********************/

  localStorage = {
    _this:this,

    create(res){
      let list = this._this.get(); // CAP NHẬT DATA

      let isExisted = false ;
      list.map((item)=>{
        if(parseInt(item.id)===parseInt(res.data.id)){
          isExisted = true ;
        }
      })

      if(!isExisted){
        list.unshift(res.data);
      }

      this._this.set(list);

    },
    update(res){
      let list = this._this.get(); // CAP NHẬT DATA
      const idata = res.data ;

      list.map((item,index)=>{

        if(parseInt(item.id) === parseInt(idata.id)){
           list[index] = idata;
        }
      });

      this._this.set(list);

    },
    remove(res){
      let list = this._this.get(); // CAP NHẬT DATA
      const idata = res.data ;

      list = list.filter((item) => {
        return parseInt(item.id) !== parseInt(idata.id)
      });

      this._this.set(list);

    }
  }

  socketResp(res){

    this.localStorage[res.type](res);

    this.whereStateChange({
      status:'socketResp',
      res:res
    });

  }

  configDB(){
    const _this = this ;
    let  url = this.db.base +   Object.keys(this.db.paginate).map((key)=>{
        return key +'='+ this.db.paginate[key]
    }).join('&');

    this.db.url = url;
    this.db.config = server.setHeader();

    this.whereStateChange({
      status:'configDB'
    });

  }

  /***********END HOW************************/

  /**********WHERE*****************/
  whereStateChange(newState){
     Object(this.state,newState);

  }
  /* END WHERE */

  resetConfigDB(name,value){
    this.db[name] = value;
    this.configDB();

    this.whereStateChange({
      status:'resetConfigDB'
    })

  }

  initData(){
    this.jwt = localStorage.getItem('feathers-jwt');
    this.get();

    this.whereStateChange({
      status:'initData'
    })

  }

  onStateChange(list){

    /* save localData localStorage*/
    this.data = list ;
    this.set(list);

  }

  setItemData(json){
    const list = this.get();
    list.unshift(json);
    this.onStateChange(list); //  ADD REDUCER TOO
  }
  updateItemData(id,json){

    const list = this.get();

    list.map((item,index)=>{

      if(parseInt(item.id) === parseInt(id)){
         list[index] = json;
      }

      return list;

    });


    this.onStateChange(list); // update to REDUCER

  }

  delItemData(id){


    let list =  this.get();

    list = list.filter((item) => {
      return parseInt(item.id) !== parseInt(id)  ;
    })

    this.onStateChange(list); // UPDATE TO REDUCER


  }
  onDBchange(res){

    this.res = res;
    const idata = res.data || {};


    switch(this.db.type){

      case 'GET':


        this.resetConfigDB("total",idata.count);
        this.onStateChange(idata.rows);


      break;

      case 'POST':


        idata.name === 'success' ?   this.setItemData(idata.data) :  this.showErr(idata.message);


      break;

      case 'PUT':

          const id = idata.data.id;


          try{
            idata.name === 'success' ? this.updateItemData(id,idata.data) : this.showErr(idata.message);
          }catch(err){ console.log(err); }




      break;

      case 'DELETE':


          idata.name === 'success' ? this.delItemData(idata.id) : this.showErr(idata.message);


      break;
    }

  }

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


  delete(id,onSuccess){

      this.db.type = 'DELETE';
      const url = server.base() + '/' + this.model+'/'+id ;

      axios.delete(url,this.db.config)
            .then((res)=>{
              this.onDBchange(res);
              onSuccess(res.data)
            },(error)=>{
              this.onError(error)

            })


  }
  post(data,onSuccess){

    this.db.type = 'POST';
    this.status = data ;

    const url = server.base()+ '/' + this.model;

    axios.post(url,data,this.db.config)
          .then((res)=>{
            this.onDBchange(res);
            onSuccess(res)
          },(error)=>{

            this.onError(error);

          });

  }

  put(id,data,onSuccess){

      this.db.type = 'PUT';
      this.status = data ;

      const url = server.base() + '/' + this.model + '?id='+id;



      axios.put(url,data,this.db.config)
            .then((res)=>{
              this.onDBchange(res);
              onSuccess(res.data)
            },(error)=>{

              this.onError(error)

      })

  }

  goto(p=0,onSuccess){
    const {url, config, paginate, total } = this.db ;

    let offset = 0 ;
    offset = parseInt(paginate.max) * (p);

    this.set('paginate',Object.assign(paginate,{
      offset:offset,
      p:p
    }));

    this.get((res)=>{
      this.onDBchange(res);
      onSuccess(res);
    },(err)=>{
      this.onError(err);

    });
  }
  pre(onSuccess){

    const {url, config, paginate,total} = this.db ;
    let next = paginate.p - 1;

    next = next < 0 ? 0 : next ;

    let offset = 0 ;
    let page = next ;
    let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));

    offset = parseInt(paginate.max) * (page);

    this.set('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));


    this.fetch((res)=>{



      this.onDBchange(res);
      onSuccess(res);
    },(err)=>{

      this.onError(err);

    });

  }
  next(onSuccess){

    const {url, config, paginate, total } = this.db ;
    let next = paginate.p + 1;

    let pages = Math.ceil( parseInt(total) / parseInt(paginate.max));
    next = next < pages ? next : pages - 1 ;

    let offset = 0 ;
    let page = next ;

    offset = parseInt(paginate.max) * (page);

    this.set('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));



    this.fetch((res)=>{

      this.onDBchange(res);
      onSuccess(res);
    },(err)=>{
      this.onError(err);

    });

  }

  fetch(onSuccess){

      this.db.type = 'GET';

      const _this = this ;
      const {url, config} = this.db ;

      alert('fetch '+this.model);

      axios.get(url,config)
            .then((res) => {

              this.onDBchange(res);
              onSuccess(res)

            },
            (error) => {
                var status = error.response.status;
                this.onError(error)

              }
            );
  }


  listenDataChange(onStateChange){

    const data = {
      res:this.res,
      list:this.data
    }
    onStateChange(data);
  }




  get list(){
    return this.data ;
  }

  get(){
    let list = JSON.parse(localStorage.getItem(this.model));
    list = list === null ? [] : list ;
    this.data = list ;
    return this.data;
  }

  /* reset data */
  set(list=[]){

    this.remove();
    localStorage.setItem(this.model,JSON.stringify(list));
    this.get(); // reset update current data

  }


  static clear(){
    localStorage.clear();
  }

  remove(){
    localStorage.removeItem(this.model);
  }


}

export default LocalData
