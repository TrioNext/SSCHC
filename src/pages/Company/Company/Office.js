
import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label,  Form, FormGroup,FormText, Input,
  Popover, PopoverHeader, PopoverBody
} from 'reactstrap';

import Model from '../../../config/model';


class Office extends Component{

    constructor(props){
      super(props);

      this.model = new Model('offices');

      this.base = '/offices';
      this.code ='office';
      this.name = 'Văn phòng';
      this.info = {};

      this.data = {
        id:0,
        list:[]

      }


      this.state = {

        onAction:'',
        status:'',

        onTab:props.onTab,

      }

      this.refErr = React.createRef();


    }

    onStateChange(newState){

      /* KEEP PRIVATE DATA*/
      this.setState(Object.assign(this.state,newState));

      /* trả giá tri về cho parent component sử dụng */
      this.props.onStateChange(this.state);


    }

    onDataChange(){

      /* TRẢ GIÁ TRỊ VỀ CHO PARENT COMPONENT SỬ DỤNG*/
      this.props.onDataChange(this.data);

      /* RE RENDER : ON DATA CHANGE THÀNH CÔNG */
      this.onStateChange({
        status:'done'
      })
    }


    /* actions after done some thing */
    hook = {
        parent:this,

        before(form){
          let err = '' ;

          delete form.ip_chamcong;

          Object.keys(form).map((key)=>{
            if(form[key]===''){
               err = 'Vui lòng nhập đầy đủ thông tin '
            }
          });

          this.parent.refErr.current.textContent = err;


          return err;
        },

        success(onAction,idata){

            switch(onAction){
              case 'post':

                  if(idata.name==='success'){
                    this.parent.data.list.push(idata.data);
                    this.parent.onDataChange();
                    this.parent.modal.toggle();

                  }else{  this.parent.refErr.current.textContent = idata.mesage }


              break;
              case 'put':

                  /* UPDATE LOCAL DATA
                  this.parent.data.list.filter((item)=>{
                    if(item.id===this.parent.modal.data.id){
                      item.name = this.parent.modal.data.name
                    }
                  });

                  this.parent.onDataChange();
                  this.parent.modal.toggle();*/
              break;

              case 'delete':


                  //alert(JSON.stringify(this.parent.data.list));
                  /*const newList = this.parent.data.list.filter(item => parseInt(item.id) !== parseInt(idata.id));

                  this.parent.data.list = newList;

                  this.parent.onDataChange();


                  this.parent.modal.toggle();*/



              break;

            }


        },

        error(err){


            const data = err.response.data ;
            const msg = data.errors[0];



            this.showErr(msg);

        },
        showErr(msg){

            const _this = this ;



            msg = msg.message.indexOf('must be unique') >-1 ? 'Mã này đã được dùng' : msg.message ;

            this.parent.refErr.current.textContent = msg;

            setTimeout(()=>{
              this.parent.refErr.current.textContent = 'status';
            },2000);


        },
    }

    /* COMPONENT NÀY DÙNG MODAL : INTERAC INSIDE  */
    modal= {

      active:false,
      parent:this,

      /* KEEP CURRENT  DATA INFO FORM ON MODAL */


      form:{
        code:'',
        name:'',
        phone:'',
        region_code:'79', // MAC DINH LÀ CODE : TP HO CHI MKN
        subregion_code:'760', // MAC DINH LÀ QUẬN 1
        address:'',
        ip_chamcong:'',
        working_begin:'08:00',
        working_end:'17:30',

      },

      onSubmit(){

        const _this = this ;



          this.parent.model.axios('post',this.form,(res)=>{
              _this.parent.hook.success('post',res);
          },(err)=>{
            alert('loi')
              _this.parent.hook.error(err);
          })



      },
      onHourChange(name, e){

          let hour = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
          let minute = this.form[name] ? this.form[name].split(':') : '';

          minute = minute === '' ? '' : minute[1];

          this.form[name] = hour + ':'+minute;



      },

      onMinuteChange(name, e){
          let minute = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
          let hour = this.form[name] ? this.form[name].split(':') : '';

          hour = hour === '' ? '00' : hour[0];
          this.form[name] = hour+':'+minute;


      },


      onChangeCity(e){
         const code = e.target.value;
         this.form['region_code'] = code ;

         this.parent.loadDistrictList(code);


      },
      onChange(name, e){

        this.form[name] = e.target.value;

      },

      listCity:[],
      listDistrict:[],

      getCity(id){

        let ret = {}
        this.listCity.map((item)=>{
          if(id===item.id){
            ret = item
          }
        })

        return ret ;
      },

      /* type : post || put =>  open modal : info || null  */
      open(type, info){

        this.form = info || this.form;
        this.active = true ;



        this.parent.onStateChange({
          onAction:type,
          status:'modal opening'
        });

      },

      toggle(){

          this.active = !this.active;

          this.form = {}

          this.parent.onStateChange({
            onAction:'',
            status:'close modal'
          });

          this.popover.active = false;

      },

      popover:{
          active:false,

          me:this,

          btnYes(){

            alert('click yes')


          },

          toggle(parent){

             this.active = !this.active;

             parent.onStateChange({
               status:'toggle popover'
             });

          }
      },

    }

    getInfo(id){

      let ret = null
      this.data.list.map((item)=>{
        if(parseInt(item.id)===parseInt(id)){
           ret = item
        }
      })

      return ret;
    }

    /* STUPID COMPONENT*/

    BlockItem(props){
      const data = props.data;
      return(
        <Col md="3" key={ props.key } className="file-box">
            <div className="file" >

                  <div className="block">
                    <div>
                       <span><i className="fa fa-map-pin mr-5"></i> {data.name}</span>
                       <span className="pull-right">
                         <a onClick={ ()=>{ this.modal.open('put',data) } }> <i className="fa fa-gear"></i> </a>
                       </span>
                    </div>
                    <i className="fa fa-phone mr-5"></i> { data.phone === null ? 'n/a' : data.phone } <br/>
                    <i className="fa fa-clock-o mr-5"></i> { data.working_begin === null ? 'n/a' : data.working_begin + ' - '+ data.working_end  } <br/>

                  </div>
                  <div className="file-name">
                    <i className="fa fa-map-marker mr-5"></i> { data.address.substring(0,30) }
                    <br/>
                    <span> { data.date_created } </span>
                  </div>

            </div>
        </Col>
      )
    }
    SelectDist(props){

      let list = [];
      this.modal.listDistrict.map((item)=>{
        list.push(<option id={item.id} key={item.id} value={ item.code } > { item.name_with_type } </option>)
      })

      return(
        <Input onChange={ (e)=>{ console.log(e.target);  } }  type="select" defaultValue={ props.selected }>
          {list}
        </Input>
      )
    }

    SelectCity(props){

      let list = [] ;


      this.modal.listCity.map((item)=>{
        list.push(<option id={item.id} value={item.code} key={item.id} > { item.name } </option>)
      })

      return(
        <Input onChange={ (e)=>{  this.modal.onChangeCity(e)  } }  type="select" defaultValue={ props.selected }>
          {list}
        </Input>
      )
    }

    /* build item component*/
    SelectHour(props){

      let list = [] ;
      for(let i=0 ; i < 24 ; i++){
       const num = i < 10 ? '0'+i : i
       list.push(<option key={i} value={ i }  > {  num +' giờ' } </option>)
      }

      return(
        <Input onChange={(e)=>{ this.modal.onHourChange(props.type, e) }}  type="select" defaultValue={ props.selected }>
          {list}
        </Input>
      )
    }

    SelectMinute(props){

      let list = [] ;
      for(let i=0 ; i < 60 ; i++){
        const num = i < 10 ? '0'+i : i

        list.push(<option key={i} value={ i } > {  num +' phút' } </option>)
      }

      return(
        <Input onChange={(e)=>{  this.modal.onMinuteChange(props.type, e)  }}  type="select" defaultValue={ props.selected }>
          {list}
        </Input>
      )

    }

    /*END STUPID COMPONENT*/



    render(){

        const list = this.data.list ;
        const modalTitle = this.state.onAction ==='post' ? 'Tạo ': 'Cập nhật ';




        return(
            <div hidden={  this.state.onTab === 'office' ? false : true } >

                <Modal  size="lg" isOpen={ this.modal.active } fade={false}   toggle={ ()=>{  this.modal.toggle() } } >
                   <ModalHeader toggle={ ()=>{ this.modal.toggle() } }> <i className="fa fa-plus"></i> { modalTitle+ this.name }  </ModalHeader>
                   <ModalBody>
                      <Form>
                          <Row form>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Mã văn phòng <span className="text-danger">*</span></Label>
                                <Input type="text" onChange={ (e)=>{ this.modal.onChange('code', e);  } } defaultValue={ this.modal.form.code }  placeholder="Tạo mã" />
                              </FormGroup>
                            </Col>
                            <Col md={8}>
                              <FormGroup>
                                <Label> Tên văn phòng <span className="text-danger">*</span></Label>
                                <Input type="text" onChange={ (e)=>{ this.modal.onChange('name', e);  } } defaultValue={ this.modal.form.name }  placeholder="Nhập tên" />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Số ĐT <span className="text-danger">*</span></Label>
                                <Input type="text" onChange={ (e)=>{ this.modal.onChange('phone', e);  } } defaultValue={ this.modal.form.phone }  placeholder="nhập số ĐT" />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Tỉnh / Thành </Label>
                                  { this.SelectCity({selected:'79'})}
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Quận/Huyện </Label>
                                  { this.SelectDist({parent:79, selected:760}) }
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>Địa chỉ <span className="text-danger">*</span></Label>
                              <Input type="text" onChange={ (e)=>{ this.modal.onChange('address', e);  } } defaultValue = { this.modal.form.address } placeholder="Nhập địa chỉ"/>
                          </FormGroup>

                          <FormGroup>
                            <Label>IP được chấm công</Label>
                              <Input type="text" onChange={ (e)=>{ this.modal.onChange('ip_chamcong', e);  } } defaultValue = { this.modal.form.ip_chamcong }  placeholder="Nhập địa chỉ IP"/>
                          </FormGroup>

                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label> Giờ làm việc </Label>
                                  { this.SelectHour({selected:8, type:'working_begin'}) }
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label> . </Label>
                                  { this.SelectMinute({selected:0, type:'working_begin'}) }
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label> Giờ tan ca </Label>

                                    { this.SelectHour({selected:17, type:'working_end'}) }

                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label> . </Label>
                                  { this.SelectMinute({selected:30, type:'working_end'}) }
                              </FormGroup>
                            </Col>
                          </Row>


                       </Form>
                   </ModalBody>


                   <div className="my-modal-footer">
                      <div className="float-right">
                          <div role="group" className="btn-group">
                                <Button className="btn-ubuntu" onClick={ ()=>{ this.modal.toggle() } }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                                <Button className="btn-ubuntu-ok" onClick={ ()=>{ this.modal.onSubmit() } }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                          </div>

                      </div>

                   </div>

                   <div className="modal-err " >
                      <div className="float-left form-err text-muted" ref={ this.refErr }>
                          status
                      </div>
                      <div className="float-right">
                        <a id="btnDel" hidden={ this.state.onAction === 'post' ? true : false  } className={'text-muted btn-delete ' } onClick={ ()=>{ this.modal.popover.toggle(this) } }>
                          <i className="fa fa-trash"></i> Xoá
                        </a>
                        <Popover placement="bottom" isOpen={this.modal.popover.active } target="btnDel"  toggle={ ()=>{ this.modal.popover.toggle(this) } }>
                          <PopoverHeader>Bạn có chắc chắn không?</PopoverHeader>
                          <PopoverBody className="text-center pa-15">
                            <button onClick={ ()=>{  this.modal.popover.btnYes(this) } } className="btn btn-sm btn-success mr-20">Có</button>

                            <button onClick={ ()=>{  this.modal.popover.toggle(this) } } className="btn btn-sm btn-secondary">Không</button>
                          </PopoverBody>
                        </Popover>
                      </div>
                   </div>


                 </Modal>

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


    /* NHẬN LỆNH TỪ NEW PROPS : PHÂN TỪ DATA VÀ ACTION*/
    receiveAction(newProps){

      //alert(JSON.stringify(this.state))
      if(newProps.onTab===this.code){
        if(newProps.tabAction==='create'){
            this.modal.open('post');
        }
      }




      /*let active = newProps.tab ==='office' ? newProps.tabAction ==='create' ? true: false : false ;

      this.setState({
        tab:newProps.tab,
        action:newProps.tabAction,
        modal:{
          status:active
        }

      })*/



    }


    loading(){
      this.onStateChange(Object.assign(this.state,{
        onAction:'read',
        status:'loading'
      }));
    }


    /* load mặc định là TPHCM*/
    loadDistrictList(parent_code){
        const _this = this;
        const District = new Model('subregions');

        District.set('paginate',{
          p:0,
          max:'all',
          sort_by:'name',
          sort_type:'asc',
          parent_code:parent_code
        })

        District.get((res)=>{
          _this.modal.listDistrict = res.rows;
          _this.onDataChange();

        },(err)=>{
          _this.hook.err(err)
        })
    }

    loadCityList(){
        const _this = this;
        const City = new Model('regions');
        City.set('paginate',{
          p:0,
          max:'all',
          sort_by:'name',
          sort_type:'asc'
        })


        City.get((res)=>{
          _this.modal.listCity = res.rows;
        },(err)=>{
          _this.hook.err(err)
        })

    }

    loadOffice(){
      const _this = this ;
      this.loading();

      this.model.get((res)=>{
        res.rows.map((item)=>{
          _this.data.list.push(item)
        });
        _this.onDataChange();
      },(err)=>{
        _this.hook.err(err)
      });

    }
    componentDidMount(){

      this.loadOffice();
      this.loadCityList();
      this.loadDistrictList(this.modal.form.region_code); // code : tp ho chi minh



    }

    /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
    componentWillReceiveProps(newProps){



        Object.assign(this.state,newProps);
        this.receiveAction(newProps);


        //alert('componentWillReceiveProps: '+JSON.stringify(newProps));
        //this.onAction(newProps);

        //this.modal.open('post');


    }


    shouldComponentUpdate(newProps, newState){

      return newProps.onTab===this.code ? true : false;



    }


    componentDidUpdate(prevProps, prevState){

      //alert('componentDidUpdate');
      /*alert('ok man : componentDidUpdate');
      alert(JSON.stringify(prevProps));
      alert(JSON.stringify(prevState));*/

    }

}

export default Office;
