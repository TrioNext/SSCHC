
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


    this.get();


  }

  listenServer(onStateChange){
    const _this = this ;

    this.socket.clientListenServer((data)=>{
        _this.get();
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

  /* save localData*/
  set(list=[]){

    this.data = list ;
    localStorage.setItem(this.model,JSON.stringify(this.data));

  }

  static clear(){
    localStorage.clear();
  }

  remove(){
    localStorage.removeItem(this.model);
  }


}

export default LocalData
