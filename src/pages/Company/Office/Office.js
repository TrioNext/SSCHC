
import React, {Component} from 'react';
import { Row, Col } from 'reactstrap';


import store from '../../../redux/store';
import Model from '../../../model/model';

/* FORM MODAL POPUP */
import OffModalComp from './offModalComp';
import offModalCtrl from './offModalCtrl';

import moment from 'moment';
import 'moment/locale/vi';

import {OFFICES, REGIONS, SUBREGIONS} from '../../../model/model-mode' ;
import { OFFICES_NAME } from '../../../model/model-name';
import { POST } from '../../../model/action-mode';

const REGION_CODE = '79'; // HCM
const SUBREGION_CODE = '760'; // quan 1


/* actions after done some thing */
class Office extends Component{

    constructor(props){

      super(props);


      this.state = {
        form:{},
        tab: OFFICES.replace('s',''),
        onAction:'',
        status:'',

        onTab:props.onTab,
        isIniData:false
      }

      this.data = {

        offices:[],
        regions:[],
        subregions:[]

      }




      /* initial WHO */
      this._doSetup();

    }

    _doSetup(){

      this.Model = new Model(OFFICES);

      this.Model.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        is_deleted:0
      });

      this._Regions = new Model(REGIONS);
      this._Regions.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        sort_by:'name',
        sort_type:'asc'
      });

      this._SubRegions = new Model(SUBREGIONS);


      /* modal form controller  */
      this._ModalOffice = new offModalCtrl(this);

      /* initial WHEN : AUTO DATA CONNECT : WHEN STORE DATA CHANGE */
      this._listenStore();

    }

    /* START : WHEN */
    /*componentDidMount(){}*/

    /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
    componentWillReceiveProps(newProps){

      /* nhận lện có liên quan đến tab : office */
      if(newProps.onTab===this.state.tab){

        this._doInitData();

        if(newProps.onAction===POST){
            //this.modalOffice.open('post');
            this._doOpenModalPost();
        }



      }



    }


    /* TRIGGER AFFTER SOMETHING*/
    /*componentDidUpdate(prevProps, prevState){}*/


    /* DESTROY - REMOVE SOMETHING*/
    componentWillUnmount(){
      alert('componentWillUnmount happen');
    }

    _listenStore(){
      /* AUTO CONNECT REDUX STORE -> COMPONENT DATA -> REFESH THEM  */
      store.subscribe(()=>{

        this.data.offices = store.getState().office.list || []  ;
        this.data.regions = store.getState().region.list || []  ;
        this.data.subregions = store.getState().subregion.list || []  ;

        this.whereStateChange({
          onAction:'connectStore',
          status:'realtime'
        })
      })
    }
    /* END : WHEN */

    /* START : HOW */
    _doOpenModalPost(){

      this.doLoadSubRegion(REGION_CODE,(res)=>{
        this._ModalOffice.open('post');
        this.whereStateChange({
          form:this.Model.form,
          onAction:'post',
          status:'open_modal'
        })
      });
    }
    _doOpenModalUpdate(data){
      //alert('sss');
      //this.data.currentRegionCode = data.region_code;

      this.doLoadSubRegion(data.region_code,(res)=>{
        this._ModalOffice.open('put',data);
        this.whereStateChange({
          form:data,
          onAction:'put',
          status:'open_modal'
        })
      });

    }
    doLoadSubRegion(region_code,onSuccess){

      this._SubRegions.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        sort_by:'name',
        sort_type:'asc',
        parent_code:region_code
      });

      this._SubRegions.get((res)=>{
        onSuccess(res)
      })
    }

    _doInitData(){

      this.Model.load();
      this._Regions.load();

      this.whereStateChange({
        isIniData:true
      })

    }
    /* END : HOW */


    /* START : WHERE HERE */
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
                         <a className='pointer' onClick={ ()=>{ this._doOpenModalUpdate(data) } }> <i className="fa fa-gear"></i> </a>
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

    whereStateChange(newState){

      /* KEEP PRIVATE DATA*/
      this.setState(Object.assign(this.state,newState));

    }
    render(){



        const modalTitle = this.props.onAction ==='post' ? 'Tạo '+ OFFICES_NAME  : 'Cập nhật '+ OFFICES_NAME;


        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true } >


                 <OffModalComp
                   data={ this.state.form }
                   name={ modalTitle  }
                   regions={ this.data.regions }
                   subregions={ this.data.subregions } 
                   onAction={ this.state.onAction}
                   modal={ this._ModalOffice }
                  />

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

    /* END WHERE */


}

export default Office;
