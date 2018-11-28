
import React, {Component} from 'react';

import {  Row, Col } from 'reactstrap';



import Model from '../../../config/model';
import Hook from '../../../config/hook.class';

import storeModalCtrl from './storeModalCtrl';
import StoreModalComp from './StoreModalComp';





import moment from 'moment';
import 'moment/locale/vi';


class Store extends Component{

    constructor(props){
      super(props);

      this.code = 'store';
      this.name = 'Cửa hàng';

      this.data = {
        id:0,
        name:'store',
        list:[]
      }

      this.state = {
        name:'store',
        onAction:'',
        status:'',
        onTab:props.onTab,

        isIniData:false
      }

      this.setup();
    }

    setup(){
      this.model = new Model('stores');

      this.model.set('paginate',{
        p:0,
        max:'all',
        is_deleted:0
      })

      this.hook = new Hook(this);
      this.modal = new storeModalCtrl(this);
    }

    setData(name,value){
      this.data[name] = value;

      /* RE RENDER : ON DATA CHANGE THÀNH CÔNG */
      this.onStateChange({
        status:'done'
      })

    }

    onStateChange(newState){

      /* KEEP PRIVATE DATA*/
      Object.assign(this.state,newState)

      /* trả giá tri về cho parent component sử dụng */
      this.props.onStateChange(this.state);


    }

    onDataChange(list){

      /* TRẢ GIÁ TRỊ VỀ CHO PARENT COMPONENT SỬ DỤNG*/

      this.data.list = list ;
      //this.props.onDataChange(this.data);


      /* RE RENDER : ON DATA CHANGE THÀNH CÔNG */
      this.onStateChange({
        status:'done'
      })
    }

    /* COMPONENT NÀY DÙNG MODAL : INTERAC INSIDE  */
    getInfo(id){

      return this.data.list.find(item=> item.id == id);

    }

    BlockItem(props){
      const data = props.data;

      const date = moment(data.date_created).format('YYYY-MM-DD HH:mm:ss');


      return(
        <Col md="3" key={ Math.random() } className="file-box">
            <div className="file" >

                  <div className="block">
                    <div>
                       <span><i className="fa fa-map-pin mr-5"></i> {data.name}</span>
                       <span className="pull-right">
                         <a className='pointer' onClick={ ()=>{ this.modal.open('put',data) } }> <i className="fa fa-gear"></i> </a>
                       </span>
                    </div>
                    <i className="fa fa-phone mr-5"></i> { data.phone === null ? 'n/a' : data.phone } <br/>

                  </div>
                  <div className="file-name">
                    <i className="fa fa-map-marker mr-5"></i> { data.address.substring(0,30) }
                    <br/>
                    <span> {   moment(date).fromNow() } </span>
                  </div>

            </div>
        </Col>
      )
    }





    loadStore(){
      const _this = this ;


      this.model.get((res)=>{

        const list = res.rows;

        _this.onDataChange(list);

      },(err)=>{
        _this.hook.err(err)
      });

    }

    componentDidMount(){


      //this.loadStore();
      //this.modal.loadCityList();
      //this.modal.loadDistrictList(this.modal.form.region_code,()=>{}); // code : tp ho chi minh

    }

    initData(){
      this.loadStore();
      this.modal.loadCityList();
      this.modal.loadDistrictList(this.modal.form.region_code,()=>{}); // code : tp ho chi minh

      this.state.isIniData = true ;
    }


    /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
    componentWillReceiveProps(newProps){


      if(newProps.onTab===this.code){

        Object.assign(this.state,newProps);

        if(!this.state.isIniData){
          this.initData()
        }
        
        if(newProps.onAction==='post'){
            this.modal.open('post');
        }
      }



    }

    /* TRIGGER AFFTER SOMETHING*/
    componentDidUpdate(prevProps, prevState){

      //alert(JSON.stringifyr);
      //alert('componentDidUpdate: '+ JSON.stringify(prevProps));
      //alert('componentDidUpdate');
      /*alert('ok man : componentDidUpdate');
      alert(JSON.stringify(prevProps));
      alert(JSON.stringify(prevState));*/

    }

    /* DESTROY - REMOVE SOMETHING*/
    componentWillUnmount(){
      alert('componentWillUnmount happen: store');
    }



    render(){

        const list = this.data.list ;
        const modalTitle = this.props.onAction ==='post' ? 'Tạo '+this.name : 'Cập nhật '+this.name;




        return(
            <div hidden={  this.props.onTab === this.code ? false : true } >


                 <StoreModalComp name={ modalTitle} onAction={ this.props.onAction} modal={ this.modal } />

                 <Row>

                    {
                      list.map((item)=>{


                        return this.BlockItem({key:item.id, data:item});

                      })
                    }

                  </Row>
            </div>
        )
    }



}

export default Store;
