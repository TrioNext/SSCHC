
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


class BenGrid extends Component{

  constructor(props){
    super(props);

    this.model = props.model;


    this.state = {
      isChecked:false,
      columnDefs: [
              {
                headerName: "SID",
                field: "id",
                width:130,
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
      rowSelection: "single",//"multiple",

          /*defaultColDef: {
            editable: true,
            enableRowGroup: true,
            enablePivot: true,
            enableValue: true
          },*/
      rowData: [],
      selectedData:[]
    }


  }

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

  onBtnEdit(){

    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.props.onBtnEdit(selectedData[0]);

  }

  onBtnDel(){
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.props.onBtnDel(selectedData);

  }

  onSelectionChanged(){
    const selectedNodes = this.gridApi.getSelectedNodes()
    const selectedData = selectedNodes.map( node => node.data );

    this.setState({
      selectedData:selectedData
    })

  }
  render(){

    let disabledBtnEdit = this.state.selectedData.length === 0 ? true : false;
    let disabledBtnDel = this.state.selectedData.length === 1 ? true : false;
    

    return (

      <div>
          <div className="toolbar">
            <Row>
              <Col md={6}>
                  <ButtonGroup>

                    <Button disabled={ disabledBtnEdit } onClick={ this.onBtnEdit.bind(this) } className={ 'btn-ubuntu'} > <i className="fa fa-pencil"></i> </Button>
                    <Button disabled={ disabledBtnDel } onClick={ this.onBtnDel.bind(this) }  className={ 'btn-ubuntu'} > <i className="fa fa-trash"></i> </Button>
                    <Button className={ 'btn-ubuntu'} > <i className="fa fa-download"></i> </Button>
                  </ButtonGroup>
              </Col>
              <Col>

              </Col>
            </Row>
          </div>

          <div className="ag-theme-material" id="myGrid" style={{boxSizing: "border-box", height: '72vh', padding:'1rem' }}>
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
