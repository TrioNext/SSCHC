
import React, {Component} from 'react';

import {  Row, Col } from 'reactstrap';


import store from '../../../redux/store';
import Model from '../../../model/model';

import storeModalCtrl from './storeModalCtrl';
import StoreModalComp from './StoreModalComp';


import moment from 'moment';
import 'moment/locale/vi';

import { STORES_NAME } from '../../../model/model-name';

import {STORES, REGIONS, SUBREGIONS} from '../../../model/model-mode' ;
import { POST } from '../../../model/action-mode';


const REGION_CODE = '79'; // HCM
const SUBREGION_CODE = '760'; // quan 1


class Store extends Component{

    constructor(props){
      super(props);


      this.state = {

        tab: STORES.substring(0, STORES.length - 1) ,

        onAction:'',
        status:'',
        onTab:props.onTab,

        isIniData:false
      }

      this.data = {
        stores:[],
        regions:[],
        subregions:[]
      }

      /* initial WHO */
      this._doSetup();
    }

    _doSetup(){
      this.Model = new Model(STORES);
      this.Model.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        is_deleted:0
      })

      /******/
      this.Regions = new Model(REGIONS);
      this.Regions.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        sort_by:'name',
        sort_type:'asc'
      });

      this.SubRegions = new Model(SUBREGIONS);

      /******************/
      this.Modal = new storeModalCtrl(this);

      this.listenStore();
    }


    /* START WHEN*/
    /*componentDidMount(){}*/


    /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
    componentWillReceiveProps(newProps){

      if(newProps.onTab===this.state.tab){

        this.initData();

        if(newProps.onAction===POST){
            this.openModalPost();
        }
      }

    }
    /* TRIGGER AFFTER SOMETHING*/
    componentDidUpdate(prevProps, prevState){}
    /* DESTROY - REMOVE SOMETHING*/
    componentWillUnmount(){
      alert('componentWillUnmount happen: store');
    }

    listenStore(){
      /* AUTO CONNECT REDUX STORE -> COMPONENT DATA -> REFESH THEM  */
      store.subscribe(()=>{

        this.data.offices = store.getState().office.list || []  ;
        this.data.regions = store.getState().region.list || []  ;
        this.data.subregions = store.getState().subregion.list || []  ;

        this.whereStateChange({
          onAction:'listenStore',
          status:'realtime'
        })
      })
    }
    /* END WHEN*/

    /*******HOW********/
    initData(){

      this.Model.load();
      this.Regions.load();

      this.whereStateChange({
        isIniData:true
      })

    }

    openModalPost(){

      this.loadSubRegion(REGION_CODE,(res)=>{
        this.Modal.open('post');
        this.whereStateChange({
          form:this.Model.form,
          onAction:'post',
          status:'open_modal'
        })
      });
    }
    openModalUpdate(data){
      //alert('sss');
      //this.data.currentRegionCode = data.region_code;

      this.loadSubRegion(data.region_code,(res)=>{
        this.Modal.open('put',data);
        this.whereStateChange({
          form:data,
          onAction:'put',
          status:'open_modal'
        })
      });

    }

    /*****END HOW***********/

    /* start WHERE */

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
                         <a className='pointer' onClick={ ()=>{ this.Modal.open('put',data) } }> <i className="fa fa-gear"></i> </a>
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

    whereStateChange(newState){
      /* KEEP PRIVATE DATA*/
      this.setState(Object.assign(this.state,newState));
    }
    render(){


        const modalTitle = this.props.onAction ==='post' ? 'Tạo '+ STORES_NAME : 'Cập nhật '+ STORES_NAME;

        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true } >


                 <StoreModalComp name={ modalTitle} regions={ this.data.regions } subregions={ this.data.subregions } onAction={ this.props.onAction} modal={ this.Modal } />

                 <Row>

                    {
                      this.data.stores.map((item)=>{


                        return this.BlockItem({key:item.id, data:item});

                      })
                    }

                  </Row>
            </div>
        )
    }



}

export default Store;
