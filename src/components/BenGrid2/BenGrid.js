
/*
props : nextColums : []
        model    : Object
        rowData : []
*/

import React, { Component } from 'react';

import {   Row, Col, ButtonGroup, Button, Input } from 'reactstrap';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import GridFooter from './GridFooter';

import BenConfirm from '../BenConfirm';




class BenGrid extends Component{

  constructor(props){
    super(props);


    this.state = {
      height: props.height || '68vh',
      key:'',
      isRightTool:props.isRightTool || false,
      isChecked:false,
      columnDefs: [
              {
                headerName: "SID",
                field: "id",
                width:140,
                checkboxSelection: true,
                filterParams: { newRowsAction: "keep" },
                checkboxSelection: function(params) {

                  return params.columnApi.getRowGroupColumns().length === 0;
                },
                headerCheckboxSelection: function(params) {
                  return params.columnApi.getRowGroupColumns().length === 0;
                }

              },
              ...props.nextColums
      ],
      rowSelection: "multiple",//"multiple",

          /*defaultColDef: {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true
          },*/
      rowData: [],
      selectedData:[]
    }

    this.model = props.model;

    this.onBtnNew = this.onBtnNew.bind(this);
    this.onFindKeyUp = this.onFindKeyUp.bind(this);
    this.onBtnFind = this.onBtnFind.bind(this);

  }

  /* WHEN*/
  componentWillReceiveProps(newProps){
    this.setState({
      rowData:newProps.rowData
    });

  }


  onGridReady(params){

     //alert('grid ready ');
     this.gridApi = params.api;

     //console.log(this.gridApi);

    /*this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      "GET",
      "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };*/
  }

  onFindKeyUp(e){

     e.key === 'Enter' ? alert(this.state.key) :  this._whereStateChange({key:e.target.value}) ;


  }

  onBtnFind(){
    alert('find key')
  }

  onBtnNew(){
    this.props.onBtnNew();
  }
  onBtnEdit(){

    this.props.onBtnEdit(this.state.selectedData[0]);

  }

  onDownload(){
    alert('download clicked');
  }

  async onBtnDel(){

    const records = this.state.selectedData.length;

    let result = await BenConfirm({
      title: 'Thông báo',
      message: "Bạn có chắc là muốn xoá "+ records+' này?',

      confirmColor: "primary",
      cancelColor: "link text-danger"

    });

    if(result){

      if(this.state.selectedData.length>1){
        this.model.deleteMulti(this.state.selectedData);
      }else{
        const id = this.state.selectedData[0].id;
        this.model.delete(id,(res)=>{
          alert(JSON.stringify(res))
        })
      }


    }

    //this.props.onBtnDel(this.state.selectedData);

  }

  onSelectionChanged(){
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.setState({
      selectedData:selectedData
    })

    // document.querySelector("#selectedRows").innerHTML = selectedRowsString;

  }

  /* HOW */

  /* WHERE*/
  _whereStateChange(newState){
    //this.setState(Object.assign(this.state,newState));
  }
  render(){

    let disabledBtnEdit = this.state.selectedData.length > 0 ? false : true;
    disabledBtnEdit = this.state.selectedData.length > 1 ? true : disabledBtnEdit;
    let disabledBtnDel = this.state.selectedData.length > 0 ? false : true;

    const clnRightTool =  this.state.isRightTool ? '' : 'hidden';

    return (

      <div>
          <div className="toolbar">
            <Row>
              <Col md={6}>
                  <ButtonGroup>

                    <Button disabled={ disabledBtnEdit } onClick={ this.onBtnEdit.bind(this) } className={ 'btn-ubuntu'} > <i className="fa fa-pencil"></i> </Button>
                    <Button disabled={ disabledBtnDel } onClick={ this.onBtnDel.bind(this) }  className={ 'btn-ubuntu'} > <i className="fa fa-trash"></i> </Button>
                    <Button className={ 'btn-ubuntu'} onClick={ this.onDownload.bind(this) }  > <i className="fa fa-download"></i> </Button>
                  </ButtonGroup>
              </Col>
              <Col md={6} className={'text-right '+ clnRightTool}>
                <ButtonGroup>


                    { this.props.customButton }

                    <Input  placeholder="Tìm kiếm" onKeyUp={ this.onFindKeyUp }  style={{borderRadius:0}}  />
                    <Button style={{marginRight:10}} onClick={ this.onBtnFind }  className="btn-ubuntu"> <i className="fa fa-search"></i> </Button>


                </ButtonGroup>

              </Col>
            </Row>
          </div>

          <div className="ag-theme-material" id="myGrid" style={{boxSizing: "border-box", height: this.state.height, padding:'1rem' }}>
              <AgGridReact

                  onSelectionChanged={this.onSelectionChanged.bind(this)}
                  enableSorting={true}
                  rowSelection={this.state.rowSelection}
                  enableColResize={true}
                  defaultColDef={this.state.defaultColDef}
                  onGridReady={this.onGridReady.bind(this)}
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}>

              </AgGridReact>

              <GridFooter model={ this.model } />
          </div>
      </div>

    )
  }
}

export default BenGrid;
