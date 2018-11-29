
import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';


import Model from '../../../config/model';


import offModalCtrl from './offModalCtrl';
import OffModalComp from './offModalComp';



import moment from 'moment';
import 'moment/locale/vi';


/* actions after done some thing */
class Office extends Component{

    constructor(props){
      super(props);

      this.base = 'offices';
      this.name = 'Văn phòng';

      this.data = {
        id:0,
        name:'office',
        list:[]

      }

      this.state = {

        onAction:'',
        status:'',

        onTab:props.onTab,
        isIniData:false
      }



      this.setup()
    }

    setup(){
      this.model = new Model(this.base);

      this.model.set('paginate',{
        p:0,
        max:'all',
        is_deleted:0
      })



      this.modal = new offModalCtrl(this);
    }


    onStateChange(newState){

      /* KEEP PRIVATE DATA*/
      this.data.list = this.model.getData(this.base) || [] ;

      this.setState(Object.assign(this.state,newState));


    }


    loadOffice(){
      const _this = this ;


      this.model.get((res)=>{

        if(typeof res.count !== 'undefined'){

            _this.onStateChange({status:'success'})

        }

      },(err)=>{

      });

    }

    initData(){
      this.loadOffice();
      this.modal.loadCityList();
      this.modal.loadDistrictList(this.modal.form.region_code,()=>{}); // code : tp ho chi minh

      this.state.isIniData = true ;


    }
    componentDidMount(){


      //this.loadOffice();
      //this.modal.loadCityList();
      //this.modal.loadDistrictList(this.modal.form.region_code,()=>{}); // code : tp ho chi minh



    }

    /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
    componentWillReceiveProps(newProps){


      /* nhận lện có liên quan đến tab : office */
      if(newProps.onTab===this.data.name){

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
      alert('componentWillUnmount happen');
    }

    /* STUPID COMPONENT*/
    BlockItem(props){
      const data = props.data;

      const date = moment(data.date_created).format('YYYY-MM-DD HH:mm:ss');
      const begin = moment('2018-11-20 '+data.working_begin).format('HH:mm');
      const end = moment('2018-11-20 '+data.working_end).format('HH:mm');



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
                    <i className="fa fa-clock-o mr-5"></i> { data.working_begin === null ? 'n/a' : begin + ' - '+ end  } <br/>

                  </div>
                  <div className="file-name">
                    <i className="fa fa-map-marker mr-5"></i> { data.address }
                    <br/>
                    <span> {   moment(date).fromNow() } </span>
                  </div>

            </div>
        </Col>
      )
    }

    render(){

        const list = this.data.list ;
        const modalTitle = this.props.onAction ==='post' ? 'Tạo '+this.name : 'Cập nhật '+this.name;



        return(
            <div hidden={  this.props.onTab === 'office' ? false : true } >


                 <OffModalComp  name={ modalTitle  } onAction={ this.props.onAction} modal={ this.modal } />

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

export default Office;