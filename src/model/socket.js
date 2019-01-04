

import feathers from '../feathers'

const  CREATED = 'created';
const  UPDATED = 'updated';
const  REMOVED = 'removed';


export default class Socket {

  static client = feathers

  constructor(service){

    this.service = service;
    this.state = {};
    this.type = '';

    this.service = feathers.service(service) ;
    this.service.timeout = 5000 ;
    this.time_respone = 2000 ;

    this.setting = {
      time_respone:2000
    }

  }

  set(newSetting){
    Object.assign(this.setting,newSetting)
  }




  /* RESONE TRUC TIẾP */
  onSuccess(onStatus,data){

    console.log('SOCKET ');
    console.log(data);
    //console.log(data);
    /*
     this.setState({
       status:onStatus,
       data:data
     });

    store.dispatch({
      type:onStatus+'-'+this.service,
      socData:data
    });*/

  }



  create(data={}){ this.socket.create(data)}
  update(id=null,data={}){ this.socket.update(id,data,{}) }
  remove(id=null){ this.socket.remove(id,{ query:{ cascade:true} })  }


  clientListenServer(onSuccess){
      const _this = this ;

      this.service.on(CREATED,(data)=>{

        _this.onSuccess(CREATED,data);

        window.setTimeout(()=>{
          onSuccess(data);
        },this.setting.time_respone)

      });

      this.service.on(UPDATED,(data)=>{
        _this.onSuccess(UPDATED,data);
        window.setTimeout(()=>{
          onSuccess(data);
        },this.setting.time_respone)
      });

      this.service.on(REMOVED,(data)=>{


        _this.onSuccess(REMOVED,data);
        window.setTimeout(()=>{
          onSuccess(data);
        },this.setting.time_respone)
      });

  }

}
