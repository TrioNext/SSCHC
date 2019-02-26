
import axios from 'axios';

const server = {
  host:"http://localhost",//"http://115.78.5.75",
  port:3333,

  url:'',
  paginate:{
    p:0,
    offset:0,
    max:2,
    is_deleted:0,
    key:''
  },

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

  goto(p,onSuccess,onError){
      this.paginate.p = p; ;
      const url = this.base()+this.url + '?p='+this.paginate.p+'&max='+this.paginate.max+'&is_deleted='+this.paginate.is_deleted;

      this.get(url,(res)=>{
        onSuccess(res);
      },(err)=>{
        onError(err);
      })
  },

  pre(onSuccess,onError){

      this.paginate.p -=1 ;
      const url = this.base()+this.url + '?p='+this.paginate.p+'&max='+this.paginate.max+'&is_deleted='+this.paginate.is_deleted;

      this.get(url,(res)=>{
        onSuccess(res);
      },(err)=>{
        onError(err);
      })
  },
  next(onSuccess,onError){

      this.paginate.p +=1 ;
      const url = this.base()+this.url + '?p='+this.paginate.p+'&max='+this.paginate.max+'&is_deleted='+this.paginate.is_deleted;

      this.get(url,(res)=>{
        onSuccess(res);
      },(err)=>{
        onError(err);
      })


  },
  get(url,onSuccess,onError){

      this.url = url ;

      url = this.base()+url + '?p='+this.paginate.p+'&max='+this.paginate.max+'&is_deleted='+this.paginate.is_deleted;
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
