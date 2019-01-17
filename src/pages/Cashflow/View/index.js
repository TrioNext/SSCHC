
import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';


/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';

/* HOOKED*/
/*............*/

/* NAMED*/
import { COIN_TRACKS } from '../../../model/model-mode';
import { COINT_TRACKS_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL*/
import CoinTrackForm from './Form';
import formController from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';


class CashflowView extends Component{

  constructor(props){

    super(props)
    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

      recType:'in' // LOẠI PHIẾU : THU - CHI
    }

    this.data = {
      coin_tracks:[]
    }

    this.grid = {
      colums:[
        {headerName: "Phiếu", field: "type"},
        {headerName: "Kỳ Thanh toán", field: "date_created"},
        {headerName: "Đôi tượng", field: "code"},
        {headerName: "Tên phiếu", field: "inventory_id"},
        {headerName: "Giá trị", field: "action_type"},
        {headerName: "Tại", field: "group_code"},
        {headerName: "PTTT", field: "creator_id"},
        {headerName: "Tài khoản", field: "status"},
        {headerName: "Trạng thái", field: "note"},
        {headerName: "Người tạo", field: "note"},
        {headerName: "Ngày", field: "note"}

      ],
      rowData: []
    }

    this._setup();

    this.onBtnNewReceIn = this.onBtnNewReceIn.bind(this);
    this.onBtnNewReceOut = this.onBtnNewReceOut.bind(this);
  }

  _setup(){
    this.model = new Model(COIN_TRACKS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.formCtrl = new formController(this.model);

    this._listenStore();

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


  /* WHEN */
  onBtnNewReceOut(){
    this._doOpenForm('out')
  }

  onBtnNewReceIn(){
    this._doOpenForm('in')
  }

  /*componentDidMount(){}*/
  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{

      this.data.coin_tracks = Store.getState().coin_track.list || []  ;

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

    const formTitle = this.state.recType === 'in' ? 'Phiếu thu' : 'Phiếu chi' ;
    const strTypeAction = this.state.typeAction === POST ? 'Tạo ' : 'Chỉnh sửa ';

    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>


              <CoinTrackForm
                recType={ this.state.recType }
                width='60%'
                name={ strTypeAction+ formTitle }
                typeAction={ this.state.typeAction }
                modal={this.formCtrl}

              />
              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 isRightTool={ true }
                 height="74vh"

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }
                 customButton={
                   <ButtonGroup>

                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnNewReceIn }  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo phiếu thu  </Button>
                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnNewReceOut}  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo phiếu chi  </Button>

                   </ButtonGroup>

                 }
              />

            </main>
        </div>
      </div>
    )
  }
}

export default CashflowView;
