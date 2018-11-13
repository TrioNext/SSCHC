
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

  get(url,onSuccess,onError){
      axios.get(
              this.base()+url,
              this.setHeader()
            )
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
