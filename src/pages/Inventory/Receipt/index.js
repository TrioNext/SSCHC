
import React, { Component } from 'react';

import { Button, ButtonGroup } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';


/* HOOKED*/
/*............*/

/* NAMED*/
import { INVENTORY_TRACKS } from '../../../model/model-mode';
import { INVENTORY_TRACK_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/


/* MODAL FORM & CTRL */
import RecForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';



class Receipt extends Component{


  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

      recType:'in' // LOẠI PHIẾU
    }

    this.data = {
      inventory_tracks:[]
    }

    this.grid = {
      colums:[
        {headerName: "Phiếu", field: "type"},
        {headerName: "Ngày", field: "date_created"},
        {headerName: "Mã", field: "code"},
        {headerName: "Kho", field: "inventory_id"},
        {headerName: "Loại", field: "action_type"},
        {headerName: "Mã đơn hàng", field: "group_code"},
        {headerName: "Người tạo", field: "creator_id"},
        {headerName: "Trạng thái", field: "status"},
        {headerName: "Ghi chú", field: "note"}

      ],
      rowData: []
    }

    this._setup();

  }

  _setup(){

    this.model = new Model(INVENTORY_TRACKS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.formCtrl = new formCtrl(this.model);
    //this.modal = new formController(this.model);

    this._listenStore();

    this.onBtnNewReceIn = this.onBtnNewReceIn.bind(this);
    this.onBtnNewReceOut = this.onBtnNewReceOut.bind(this);

  }

  /* HOW */
  resetGrid(){
      /*let list = this.data.users || []  ;

      list.filter((item)=>{
        item['str_job_level'] = userConf.job_level[item['job_level']];
        item['str_job_type'] = userConf.job_type[item['job_type']];
        item['str_phone'] = item['phone'] === null ? 'n/a' : item['phone'];
        item['str_date_created'] = moment(item['date_created']).format('YYYY-MM-DD');
      });

      //alert('resetGrid');
      this.grid.rowData = list ;*/

  }


  _doOpenModalPost(){

    //this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }

  _doOpenModalUpdate(data){

  }

  _doOpenForm(type){

    this.formCtrl.open('post');

    this._whereStateChange({
      recType:type,
      typeAction:'post',
      onAction:'open_modal'
    })
  }
  /* END HOW*/


  /* WHEN*/
  /* onbtn Create phiếu xuất*/
  onBtnNewReceOut(){
    //this._doOpenModalPost();
    this._doOpenForm('out')
  }

  /* onbtn Create phiếu xuất*/
  onBtnNewReceIn(){
    //this._doOpenModalPost();
    this._doOpenForm('in')
  }



  componentDidMount(){
    //this._isMounted = true;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{

      this.data.inventory_tracks = Store.getState().inventory_track.list || []  ;

      this._whereStateChange({
        onAction:'_listenStore'
      });

    })
  }

  /* WHERE*/

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    const formTitle = this.state.recType === 'in' ? 'Phiếu nhập' : 'Phiếu xuất' ;
    const strTypeAction = this.state.typeAction === POST ? 'Tạo ' : 'Chỉnh sửa ';


    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>


              <RecForm
                recType={ this.state.recType }
                width='90%'
                name={ strTypeAction+ formTitle }
                typeAction={ this.state.typeAction }
                modal={this.formCtrl}

              />
              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 isRightTool={ true }

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }
                 customButton={
                   <ButtonGroup>

                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnNewReceOut }  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo phiếu xuất  </Button>
                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnNewReceIn}  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo phiếu nhập  </Button>

                   </ButtonGroup>

                 }
              />
            </main>
        </div>
      </div>
    )
  }
}

export default Receipt;
