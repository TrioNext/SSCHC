
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
    this.state = {
      onAction:'',
      status:'',
      res:{}
    };
    //this.res = {};


    /* initial : WHO */
    this._setup(model);

  }

  _setup(model){
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
  onError(err){
    const data = err.response.data ;
    const msg = data.errors[0];

    this.showErr(msg);
  }

  /* SOCKET*/
  listenOnSocketTick(onDataChange){
    const _this = this ;

    this.socket.clientListenServer((res)=>{

        this.socketResp(res);

        // --> callback()
        onDataChange(res,this.list);

    })
  }

  listenDataChange(onDataChange){


    const data = {
      res:this.state.res,
      list:this.data
    }
    onDataChange(data);
  }

  delete(id,onSuccess){

      this.db.type = 'DELETE';
      const url = server.base() + '/' + this.model+'/'+id ;

      axios.delete(url,this.db.config)
            .then((res)=>{
              this.restResp(res);
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
            this.restResp(res);
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
              this.restResp(res);
              onSuccess(res.data)
            },(error)=>{

              this.onError(error)

      })

  }

  goto(p=0,onSuccess){


    const {url, config, paginate, total } = this.db ;

    let offset = 0 ;
    offset = parseInt(paginate.max) * (p);

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:p
    }));

    this.fetch((res)=>{

      this.restResp(res);
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

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));


    this.fetch((res)=>{

      this.restResp(res);
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

    this.resetConfigDB('paginate',Object.assign(paginate,{
      offset:offset,
      p:page
    }));



    this.fetch((res)=>{

      this.restResp(res);
      onSuccess(res);
    },(err)=>{
      this.onError(err);

    });

  }

  fetch(onSuccess){

      this.db.type = 'GET';

      const _this = this ;
      const {url, config} = this.db ;


      axios.get(url,config)
            .then((res) => {


              this.restResp(res);
              onSuccess(res)

            },
            (error) => {
                var status = error.response.status;
                this.onError(error)

              }
            );
  }
  /********END WHEN *********** */

  /***********HOW**********************/

  localStorage = {
    _this:this,

    /* for rest*/
    GET(res){

      const idata = res.data ;

      this._this.resetConfigDB("total",idata.count);
      this._this.set(idata.rows);


    },
    POST(res){

      const idata = res.data ;


      let list = this._this.get();
      list.unshift(idata.data);
      this._this.set(list);


    },
    PUT(res){

      const idata = res.data ;
      const id = idata.data.id;

      //////////
      const list = this._this.get();

      list.map((item,index)=>{

        if(parseInt(item.id) === parseInt(id)){
           list[index] = idata.data;
        }

        return list;

      });
      this._this.set(list);


    },
    DELETE(res){

        const idata = res.data ;

        let list =  this._this.get();

        list = list.filter((item) => {
          return parseInt(item.id) !== parseInt(idata.id)  ;
        });

        this._this.set(list);

    },

    /* for socket*/
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
      onAction:'socketResp',
      status:res.type,
      res:res
    });

  }
  restResp(res){

    const idata = res.data || {};

    idata.name === 'success' ?  this.localStorage[this.db.type](res) : this.showErr(idata.message);

    this.whereStateChange({
      onAction:'restResp',
      status:this.db.type,
      res:res
    })


  }

  configDB(){
    const _this = this ;
    let  url = this.db.base +   Object.keys(this.db.paginate).map((key)=>{
        return key +'='+ this.db.paginate[key]
    }).join('&');

    this.db.url = url;
    this.db.config = server.setHeader();

    this.whereStateChange({
      onAction:'configDB'
    });

  }

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



  /***********END HOW************************/

  /**********WHERE*****************/
  whereStateChange(newState){

     Object(this.state,newState);

  }
  /* END WHERE */




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

    this.whereStateChange({
      onAction:'showErr',
      status:msg
    })
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
