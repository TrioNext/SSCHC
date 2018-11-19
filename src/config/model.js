
/* MODEL NÀY CÓ THỂ KẾT NỐI VỚI REDUX - MOBX để luu cache database dùng lại*/

import server from './server';
import axios from 'axios';



class Model {

  constructor(model){
    this.model = '/'+model;

    this.data = [];
    this.status = '';

    /* WHO */
    this.server = server ;

    this.setting = {
      url:'',
      base:server.base() + this.model+'?',
      config:'',
      paginate:server.paginate,

    };

    this.setup();


  }



  setup(){

    let  url = this.setting.base +   Object.keys(this.setting.paginate).map((key)=>{
        return key +'='+ this.setting.paginate[key]
    }).join('&');

    this.setting.url = url;
    this.setting.config = server.setHeader();

  }

  set(name,value){
    this.setting[name] = value;
    this.setup();
  }
  get(name){
    return this.setting[name];

  }


  axios(method,data={},onSuccess,onError){

    switch (method) {
      case 'post':
          this.post(data,onSuccess,onError);
      break;
      case 'put':
          const id = data.id;
          delete data.id ;
          this.put(id,data,onSuccess,onError);
      break;


    }

  }

  delete(id,onSuccess,onError){

      const url = this.setting.base+'/'+id ;
      axios.delete(url,this.setting.config)
            .then((res)=>{
              onSuccess(res.data)
            },(error)=>{
              onError(error)
            })


  }

  post(data,onSuccess,onError){

    const url = server.base() + this.model;

    axios.post(url,data,this.setting.config)
          .then((res)=>{
            onSuccess(res.data)
          },(error)=>{
            onError(error);
          });

  }

  put(id,data,onSuccess,onError){


      const url = server.base() + this.model + '?id='+id;
      axios.put(url,data,this.setting.config)
            .then((res)=>{
              onSuccess(res.data)
            },(error)=>{
              onError(error);
      })



  }


  goto(p=0,onSuccess,onError){
    const {url, config, paginate} = this.setting ;

    this.set('paginate',Object.assign(paginate,{
      p:p
    }));


    this.get((res)=>{
      onSuccess(res);
    },(err)=>{
      onError(err);
    });
  }
  pre(onSuccess,onError){

    const {url, config, paginate} = this.setting ;
    let next = paginate.p - 1;
    this.set('paginate',Object.assign(paginate,{
      p:next
    }));



    this.get((res)=>{
      onSuccess(res);
    },(err)=>{
      onError(err);
    });

  }
  next(onSuccess,onError){

      const {url, config, paginate} = this.setting ;
      let next = paginate.p + 1;
      this.set('paginate',Object.assign(paginate,{
        p:next
      }));


      this.get((res)=>{
        onSuccess(res);
      },(err)=>{
        onError(err);
      });


  }


  get(onSuccess,onError){

      const {url, config} = this.setting ;
      axios.get(url,config)
            .then((response) => {
                onSuccess(response.data)
            },
            (error) => {
                var status = error.response.status
                onError(error);
              }
            );
  }



}

export default Model
