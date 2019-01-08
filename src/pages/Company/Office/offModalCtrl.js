
/*
OfficeModal :  it's a Controller for <BenModal/>

*/

import store from '../../../redux/store';


import { detectForm } from '../../../hook/before';
import { doLoadSubRegion } from '../../../hook/ultil';


const REGION_CODE = '79'; // HCM
const SUBREGION_CODE = '760'; // quan 1


class OfficeModal{

    constructor(model){

      // -->
      this.active = false ; /* FOR OPEN MODAL */

      this.state = {
        type:'',
        onAction:'',
        status:''
      }

      this.data = {}
      // -->
      this.model = model ;


    }


    getTemp(){
      return {
        code:'',
        name:'',
        phone:'',
        region_code:REGION_CODE,
        subregion_code:SUBREGION_CODE,
        address:'',
        ip_chamcong:'',
        working_begin:'08:00:00',
        working_end:'17:30:00',
      }
    }

    /* START : WHEN */
    onSubmit(){


      const _this = this ;
      const onAction = this.state.onAction; /* PUT - POST */


      const data = this.data;

      /* HOOKED detectForm before save data*/
      // -->
      if(detectForm(['code','name','phone','address'],this.data)===''){

          this.model.axios(onAction,data,(res)=>{
            // -->

            _this.whereStateChange({
              status:res.name
            });



          })
      }

    }

    onHourChange(name, e){

        let hour = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
        let minute = this.data[name] ? this.data[name].split(':') : '';

        minute = minute === '' ? '00' : minute[1];

        this.data[name] = hour + ':'+minute;


        // -->
        this.processForm(name,e)
    }

    onMinuteChange(name, e){
        let minute = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
        let hour = this.data[name] ? this.data[name].split(':') : '';

        hour = hour === '' ? '00' : hour[0];

        this.data[name] = hour+':'+minute;


        // --> HOW -> WHERE
        this.processForm(name,e);
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



    /* END WHEN  */

    /* START : HOW */
    processForm(name,e){
       //-->
       this.whereStateChange({
         status:'processForm'
       })
    }

    toggle(){

      this.active = !this.active;
      this.popover.active =  false;

      // -->
      this.whereStateChange({
        onAction:'toggle_modal'
      })


    }

    loadDistrictList(parent_code,onSuccess){

        const _this = this;
        doLoadSubRegion(parent_code,(res)=>{
          this.whereStateChange({
            status:'loadDistrictList'
          })
        })

    }


    open(onAction, info){


      //const {temp} = info || FORM_TEMP ;
      this.data = info || this.getTemp() ;
      this.active = true ;



      this.whereStateChange({
        onAction:onAction,
        status:'open_modal'
      });



    }

    /* END HOW */


    /* START : WHERE */
    whereStateChange(newState={}){

      Object.assign(this.state,newState);

      if(newState.status ==='success'){
        this.toggle()
      }else{

        //alert('FORM-'+this.model.model);

        store.dispatch({
          type:'FORM-'+this.model.model,
          onAction:newState.onAction
        })
      }

    }



    /* END WHERE */


    popover = {
        active:false,

        parent:this,
        btnYes(){


          const id = this.parent.data.id;

          this.parent.model.delete(id,(res)=>{

              this.parent.whereStateChange({
                status:res.name
              });

          })

        },

        toggle(){

           this.active = !this.active;
           this.parent.whereStateChange({
             onAction:'toggle_popover'
           })

        }
    }


}

export default OfficeModal
