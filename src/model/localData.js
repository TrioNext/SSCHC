
/*
-> clear all data
    --> load and store data
        --> auto update data via : socket
            --> send to reducer
*/

import Socket from './socket';

class LocalData {

  constructor(model){

    this.model = model;
    this.socket = new Socket(model);

    this.data = [] ;
    this.state = {}

    this.jwt = localStorage.getItem('feathers-jwt');

    this.get();


  }

  listenServer(onStateChange){
    const _this = this ;

    this.socket.clientListenServer((data)=>{
        _this.get(); // CAP NHẬT DATA
        onStateChange(data);
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
