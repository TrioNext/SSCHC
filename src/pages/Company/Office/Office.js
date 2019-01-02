
import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';


import store from '../../../redux/store';
import Model from '../../../model/model';

/* FORM MODAL POPUP */
import OffModalComp from './offModalComp';
import offModalCtrl from './offModalCtrl';

import moment from 'moment';
import 'moment/locale/vi';

import {OFFICES, REGIONS} from '../../../model/model-mode' ;
import { OFFICES_NAME } from '../../../model/model-name';



/* actions after done some thing */
class Office extends Component{

    constructor(props){
      super(props);


      this.data = {
        offices:[],
        regions:[]
      }

      this.state = {
        name: OFFICES.replace('s',''),
        onAction:'',
        status:'',

        onTab:props.onTab,
        isIniData:false
      }


      /* initial model - controller */
      this.setup();

      /* AUTO CONNECT REDUX STORE -> COMPONENT DATA -> REFESH THEM  */
      store.subscribe(()=>{

        this.data.offices = store.getState().office.list || []  ;
        this.data.regions = store.getState().region.list || []  ;

        this.onStateChange({
          onAction:'reducer-change',
          status:'success'
        })
      })

    }

    setup(){

      this.model = new Model(OFFICES);

      this.model.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        is_deleted:0
      });

      this.moRegion = new Model(REGIONS);
      this.moRegion.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        sort_by:'name',
        sort_type:'asc'
      });

      /* modal form controller  */
      this.modalOffice = new offModalCtrl(this);
    }


    onStateChange(newState){

      /* KEEP PRIVATE DATA*/
      this.setState(Object.assign(this.state,newState));

    }

    initData(){

      this.model.load();
      this.moRegion.load();

      this.state.isIniData = true ;


    }
    componentDidMount(){


      /*this.loadOffice();
      this.modal.loadCityList();
      this.modal.loadDistrictList(this.modal.form.region_code,()=>{}); // code : tp ho chi minh*/



    }

    /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
    componentWillReceiveProps(newProps){


      /* nhận lện có liên quan đến tab : office */
      if(newProps.onTab===this.state.name){

        Object.assign(this.state,newProps);

        if(!this.state.isIniData){
          this.initData()
        }


        if(newProps.onAction==='post'){
            this.modalOffice.open('post');
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
                         <a className='pointer' onClick={ ()=>{ this.modalOffice.open('put',data) } }> <i className="fa fa-gear"></i> </a>
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



        const modalTitle = this.props.onAction ==='post' ? 'Tạo '+ OFFICES_NAME  : 'Cập nhật '+ OFFICES_NAME;


        return(
            <div hidden={  this.props.onTab === 'office' ? false : true } >


                 <OffModalComp  name={ modalTitle  } regions={ this.data.regions } onAction={ this.props.onAction} modal={ this.modalOffice } />

                 <Row>

                    {
                      this.data.offices.map((item)=>{


                        return this.BlockItem({key:item.id, data:item});

                      })
                    }

                  </Row>
            </div>
        )
    }


}

export default Office;
