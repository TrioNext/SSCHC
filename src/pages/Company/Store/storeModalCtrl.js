
/*
OfficeModal :  it's a Controller for <BenModal/>

*/

import Model from '../../../model/model';


class StoreModal{

    constructor(app){
      this.active = false;
      this.app = app ;

      this.state = {
        onAction:'',
        status:''
      }

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

    }

    loadCityList(){
        const _this = this;

        const City = new Model('regions');
        City.set('paginate',{
          offset:0,
          p:0,
          max:'all',
          sort_by:'name',
          sort_type:'asc'
        })

        let list = City.getData('regions');
        if(list.length===0){

          City.get((res)=>{

            list = City.getData('regions');
            _this.listCity = list;

          })

        }


    }

    loadDistrictList(parent_code,onSuccess){


        const _this = this;

        const District = new Model('subregions');

        District.set('paginate',{
          offset:0,
          p:0,
          max:'all',
          sort_by:'name',
          sort_type:'asc',
          parent_code:parent_code
        })

        District.get((res)=>{


          if(typeof res.count !== 'undefined'){
              _this.listDistrict = District.getData('subregions')
              _this.app.onStateChange({status:'success'})
          }



        })
    }


    onSubmit(){

      const _this = this ;
      const onAction = this.state.onAction;

      this.app.model.axios(onAction,this.form,(res)=>{
          if(typeof res.name  !== 'undefined'){
            const status = res.name ;
            if(status==='success'){
              _this.app.onStateChange({status:status});
              _this.toggle();
            }
          }
        })

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


      if(typeof info !== 'undefined'){
        this.loadDistrictList(info.region_code,()=>{

          /* SET STATE CHANGE */
          _this.app.onStateChange({
            onAction:type,
            status:'modal opening'
          });



        });

      }

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
                _this.parent.app.onStateChange({status:res.name});
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

export default StoreModal
