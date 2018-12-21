
/*
OfficeModal :  it's a Controller for <BenModal/>

*/

import Model from '../../../config/model';

import hookBefore from '../../../hook/beforePost';


class OfficeModal{

    constructor(app){
      this.active = false;
      this.app = app ;

      this.state = {
        onAction:'',
        status:''
      }

      this.currentRegionCode = '79';

      this.defaultValue = {
        region_code:'79', // MAC DINH LÀ CODE : TP HO CHI MKN
        subregion_code:'760', // MAC DINH LÀ QUẬN 1
        working_begin:'08:00:00',
        working_end:'17:30:00',
      }

      this.form = {
        code:'',
        name:'',
        phone:'',
        region_code:'79', // MAC DINH LÀ CODE : TP HO CHI MKN
        subregion_code:'760', // MAC DINH LÀ QUẬN 1
        address:'',
        ip_chamcong:'',
        working_begin:'08:00:00',
        working_end:'17:30:00',
      }

      this.listCity = [];
      this.listDistrict = [];

      this.subregions = [] ;

    }

    loadDistrictList(parent_code,onSuccess){


        const _this = this;
        this.moSubRegion = new Model('subregions');

        this.moSubRegion.set('paginate',{
          offset:0,
          p:0,
          max:'all',
          sort_by:'name',
          sort_type:'asc',
          parent_code:parent_code
        })

        this.moSubRegion.get((res)=>{

          _this.subregions = this.moSubRegion.getData('subregions');


          _this.app.onStateChange({status:'success'})

        })
    }


    onSubmit(){

      const _this = this ;
      const onAction = this.state.onAction;

      if(hookBefore(['code','name','phone','address'],this.form)===''){

        this.app.model.axios(onAction,this.form,(res)=>{
              //_this.app.hook.success(onAction,res);
              if(typeof res.name  !== 'undefined'){
                const status = res.name ;
                if(status==='success'){
                  _this.app.onStateChange({status:status});
                  _this.toggle();
                }
              }

        });

      }



    }

    onHourChange(name, e){

        let hour = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
        let minute = this.form[name] ? this.form[name].split(':') : '';

        minute = minute === '' ? '' : minute[1];

        this.form[name] = hour + ':'+minute;


    }

    onMinuteChange(name, e){
        let minute = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
        let hour = this.form[name] ? this.form[name].split(':') : '';

        hour = hour === '' ? '00' : hour[0];
        this.form[name] = hour+':'+minute;

    }

    onChangeDist(e){
      const code = e.target.value;
      this.form['subregion_code'] = code ;
    }

    onChangeCity(e){
       const code = e.target.value;
       this.form['region_code'] = code ;

       this.loadDistrictList(code);


    }

    onChange(name, e){

      this.form[name] = e.target.value;

    }

    getCity(id){

      let ret = {}
      this.listCity.map((item)=>{
        if(id===item.id){
          ret = item
        }
      })

      return ret ;
    }

    setState(name,value){

      this.state[name] = value ;
    }
    open(type, info){

      this.form = info || this.form;
      this.active = true ;

      const _this = this ;
      this.setState('onAction',type);

      this.currentRegionCode = typeof info !=='undefined' ? info.region_code : this.currentRegionCode;

      this.loadDistrictList(this.currentRegionCode,()=>{

        /* SET STATE CHANGE */
        _this.app.onStateChange({
          onAction:type,
          status:'modal opening'
        });

      });



    }

    toggle(){

        this.active = !this.active;

        this.form = this.defaultValue;

        this.app.onStateChange({
          onAction:'',
          status:'close modal'
        });

        this.popover.active = false;

    }

    popover = {
        active:false,

        parent:this,
        btnYes(){

          const _this = this ;
          const id = this.parent.form.id;

          this.parent.app.onStateChange({
            onAction:'delete',
            status:'on comfirm delete..'
          });

          this.parent.app.model.delete(id,(res)=>{

            if(typeof res.name !== 'undefined'){
              if(res.name==='success'){
                _this.parent.app.onStateChange(res.name);
                _this.parent.toggle();
              }
            }

          })

        },

        toggle(){

           this.active = !this.active;

           this.parent.app.onStateChange({
             status:'toggle popover'
           });

        }
    }

}

export default OfficeModal
