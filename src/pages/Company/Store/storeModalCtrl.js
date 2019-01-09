
/*
OfficeModal :  it's a Controller for <BenModal/>

*/

import store from '../../../redux/store';

import { detectForm } from '../../../hook/before';
import { doLoadSubRegion } from '../../../hook/ultil';


class StoreModal{

    constructor(model){

      this.active = false;

      this.state = {

        typeAction:'',
        onAction:'',
        status:''
      }


      this.model = model ;

    }

    _stateDataTemp(){
      return {
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
    }

    
    loadDistrictList(parent_code,onSuccess){

        const _this = this;
        doLoadSubRegion(parent_code,(res)=>{
          this._whereStateChange({
            onAction:'loadDistrictList'
          })
        })

    }


    /* START : WHEN */
    onSubmit(){


      const typeAction = this.state.typeAction; /* PUT - POST */

      /* HOOKED detectForm before save data*/
      // -->
      if(detectForm(['code','name','phone','address'],this.data)===''){

          this.model.axios(typeAction,this.data,(res)=>{
            // -->
            this._whereStateChange({
              onAction:'onSubmit',
              status:res.name
            });

          })
      }

    }

    onChangeDist(e){
      const code = e.target.value;

      this.data['subregion_code'] = code ;


      // --> HOW -> WHERE
      this.processForm('subregion_code',e);
    }

    onChangeCity(e){
       const code = e.target.value;

       this.data['region_code'] = code ;
       // --> HOW -> WHERE
       this.loadDistrictList(code);


    }

    onChange(name, e){


      Object.assign(this.data,{ [name]:e.target.value});
      //this.data[name] = e.target.value;

      // --> initial HOW -> WHERE
      this.processForm(name,e);

    }


    /* START : HOW */
    processForm(name,e){
       //-->
       this._whereStateChange({
         onAction:'processForm'

       })
    }

    toggle(){

      this.active = !this.active;
      this.popover.active =  false;

      // -->
      this._whereStateChange({
        onAction:'toggle_modal'
      })


    }

    open(typeAction, info){


      //const {temp} = info || FORM_TEMP ;
      this.data = info || this._stateDataTemp() ;
      this.active = true ;

      this._whereStateChange({
        typeAction:typeAction,
        onAction:'open',
        status:'opened'
      });



    }
    /* START : WHERE */
    _whereStateChange(newState={}){

      Object.assign(this.state,newState);

      if(newState.status ==='success'){
        this.toggle()
      }else{
        //alert('FORM-'+this.model.model);
        store.dispatch({
          type:'STATE-'+this.model.model,
          state:this.state
        })
      }

    }

    popover = {
        active:false,

        parent:this,
        btnYes(){


          const id = this.parent.data.id;

          this.parent.model.delete(id,(res)=>{

              this.parent._whereStateChange({
                onAction:'btnYes',
                typeAction:'delete',
                status:res.name
              });

          })

        },

        toggle(){

           this.active = !this.active;
           this.parent._whereStateChange({
             onAction:'toggle_popover'
           })

        }
    }

}

export default StoreModal
