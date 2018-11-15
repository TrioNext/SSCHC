
import axios from 'axios';

const server = {
  host:"http://localhost",
  port:3333,
  base(){
    return this.host+':'+this.port
  },

  setHeader(){

    return  {
      headers:{
        "Content-Type": "application/json",
        "Authorization": this.token(),
        "cache-control": "no-cache"
      }
    }
  },
  token:function(){
    return localStorage.getItem('feathers-jwt');
  },


  axios(method,url,data={},onSuccess,onError){

    switch (method) {
      case 'post':
          this.post(url,data,onSuccess,onError);
      break;
      case 'put':
          this.put(url,data,onSuccess,onError);
      break;


    }

  },

  delete(url,onSuccess,onError){
      url = this.base()+url;
      const config = this.setHeader();

      axios.delete(url,config)
            .then((res)=>{
              onSuccess(res.data)
            },(error)=>{
              onError(error)
            })


  },
  post(url,data,onSuccess,onError){
    url = this.base()+ url;
    const config = this.setHeader();

    axios.post(url,data,config)
          .then((res)=>{
            onSuccess(res.data)
          },(error)=>{
            onError(error);
          });

  },
  put(url,data,onSuccess,onError){

      url = this.base()+ url;
      const config = this.setHeader();

      axios.put(url,data,config)
            .then((res)=>{
              onSuccess(res.data)
            },(error)=>{
              onError(error);
            })



  },
  get(url,onSuccess,onError){


      url = this.base()+url;
      const config = this.setHeader();

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

export default server;
