
/*
OfficeModal :  it's a Controller for <BenModal/>

*/

import { detectForm } from '../../../hook/before';

const REGION_CODE = '79'; // HCM
const SUBREGION_CODE = '760'; // quan 1


class OfficeModal{

    constructor(app){

      // -->
      this.active = false ; /* FOR OPEN MODAL */

      this.state = {
        type:'',
        onAction:'',
        status:''
      }

      this.data = {}


      this.form = {
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


      // -->
      this.app = app ;


    }



    /* START : WHEN */
    onSubmit(){


      const _this = this ;
      const type = this.state.type;

      const data = this.form ;  //onAction === 'post' ? this.form : this.data;


      /* HOOKED detectForm before save data*/

      // -->
      if(detectForm(['code','name'],data)===''){

          this.app.model.axios(type,data,(res)=>{

            // -->
            _this.whereStateChange({
              onAction:type+'ed',
              status:res.name
            });

          })
      }

    }

    onHourChange(name, e){

        let hour = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
        let minute = this.form[name] ? this.form[name].split(':') : '';

        minute = minute === '' ? '00' : minute[1];

        this.form[name] = hour + ':'+minute;

        // -->
        this.processForm(name,e)
    }

    onMinuteChange(name, e){
        let minute = parseInt(e.target.value) >= 10 ? e.target.value : '0'+ parseInt(e.target.value) ;
        let hour = this.form[name] ? this.form[name].split(':') : '';



        hour = hour === '' ? '00' : hour[0];
        this.form[name] = hour+':'+minute;

        // --> HOW -> WHERE
        this.processForm(name,e);
    }

    onChangeDist(e){
      const code = e.target.value;
      this.form['subregion_code'] = code ;

      // --> HOW -> WHERE
      this.processForm('subregion_code',e);
    }

    onChangeCity(e){
       const code = e.target.value;
       this.form['region_code'] = code ;

       // --> HOW -> WHERE
       this.loadDistrictList(code);


    }


    onChange(name, e){

      this.form[name] = e.target.value;

      // --> initial HOW -> WHERE
      this.processForm(name,e);

    }



    /* END WHEN  */

    /* START : HOW */
    processForm(name,e){
       //-->
       this.whereStateChange({
         onAction:'processForm'
       })
    }

    toggle(){

      this.active = !this.active;
      this.popover.active = false;

      // -->
      this.whereStateChange({
        onAction:'toggle_modal',
        status:'success'
      })


    }

    loadDistrictList(parent_code,onSuccess){

        const _this = this;

        this.app.loadSubRegion(parent_code,(res)=>{

          _this.whereStateChange({
            onAction:'loadDistrictList',
            status:'success'
          })

        })

    }


    open(type, info){


      const temp = info || this.form ;
      this.form = temp ;
      this.active = true ;

      /* RE-RENDER COMPONENT */
      // -->
      this.whereStateChange({
        type:type,
        onAction:type,
        status:'start'
      });


    }

    /* END HOW */


    /* START : WHERE */
    whereStateChange(newState={}){
      /* update state*/
      Object.assign(this.state,newState);

      switch(newState.onAction){
        case 'puted':
           newState.status === 'success' ? this.toggle() : this.app.whereStateChange(this.state);
        break;
        case 'posted':
           newState.status === 'success' ? this.toggle() : this.app.whereStateChange(this.state);
        break;

        case 'deleteed':
           newState.status === 'success' ? this.toggle() : this.app.whereStateChange(this.state);
        break;

        default :
          /* RE-RENDER COMPONENT*/
          this.app.whereStateChange(this.state);
        break ;
      }
    }



    /* END WHERE */


    popover = {
        active:false,

        parent:this,
        btnYes(){

          const _this = this ;
          const id = this.parent.data.id;

          this.parent.app.model.delete(id,(res)=>{


              if(res.name==='success'){
                _this.parent.toggle();
              }

          })

        },

        toggle(){

           this.active = !this.active;

           this.parent.app.whereStateChange({
             onAction:'toggle_popover',
             status:'success'
           });

        }
    }


}

export default OfficeModal
