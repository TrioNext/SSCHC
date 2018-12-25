

import feathers from '../feathers'
import store from '../redux/store';


const  CREATED = 'created';
const  UPDATED = 'updated';
const  REMOVED = 'removed';

class Socket {

  constructor(service){

    this.service = service;
    this.state = {};
    this.type = '';

    this.socket = feathers.service(service) ;
    this.socket.timeout = 5000 ;

  }

  /* send to reducers */
  onSuccess(onStatus,data){

    store.dispatch({
      type:onStatus+'-'+this.service,
      socData:data
    });
  }


  
  create(data={}){ this.socket.create(data)}
  update(id=null,data={}){ this.socket.update(id,data,{}) }
  remove(id=null){ this.socket.remove(id,{ query:{ cascade:true} })  }


  clientListenServer(){
      const _this = this ;

      this.socket.on(CREATED,(data)=>{
        _this.onSuccess(CREATED,data);
      });

      this.socket.on(UPDATED,(data)=>{
        _this.onSuccess(UPDATED,data);
      });

      this.socket.on(REMOVED,(data)=>{
        _this.onSuccess(REMOVED,data);
      });


  }


}
