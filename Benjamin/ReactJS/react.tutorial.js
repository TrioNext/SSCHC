
/* COMPONENTS
Lý thuyết : có thể sử dụng : phối hợp nhiều components chứa trong

  + Có 2 loại :
      - class component : có chứa state holding data : faster and smart component : because he react on data IN
      - function component : ko có state : ko react ko data IN :  nên dùng cho child components

      => Trường hợp nào nên dùng : think simple first
        - luôn luôn nghĩ đến function component trước :
        - Tiếp theo nếu thấy sự cần thiết : phải sử dụng lifecycle của compnent
            - VIEW : Thiết kế render : class component
            - TOUCH thiết kế state để giử data
                    thiết kế vòng đời cho component
            - SEARCH : DOM Node -
            - SETTING :
                    - DOM events
                    - hook after TOUCHED

  + Class component
      - state : holding data
      - props : params for input to : ( ta có thể đưa vào 1 components con)
          - props.child : <Parent> child here  </Parent>
      render : view this component out

  + function component
      - props
      - render

  + component : propsType :  để validation data holding :  in - out :
    component.defaultProps = {
      name:'test name'
  }

  + lifecycle : lý tưởng : ta kiểm soát component thông qua state - props  của nó

      BEFORE MOUNT
      - constructor : initial first : validation data in
      - componentWillMount()  :  less used : make slow :

      DONE : render() : DOM available

      AFTER MOUNTED :
      componentDidMount()	  : most using for : Starting AJAX calls to load in data for your
                            here you want to do all the setup one : which  you couldn’t do without a DOM before ,
                                - initial other
                                - add event listeners

      componentWillReceiveProps(newProps) : phản ứng của component : react behavious : RE-RENDER
                                    when state change : parent state change (have new props input come : do this actions update component)
                                    : most usecase : Use setState()

                                    - Trước khi nhận params : nó có thể làm 1 số thứ:


      shouldComponentUpdate (newProps, newState) : phản ứng của component : react behavious :
                                                  - Khi có new props input : nó so sánh với curent state của nó
                                                  để update hoặc cần update
                                                  - nó luôn tra về : false || true => componentWillReceiveProps hoạt động
                                                  - Skips render() if returns false

                                    - điều kiện để nó update components

      componentWillUpdate (newProps, newState) :  Can’t use setState() here KHÔNG - RE-RENDER
                                                  - use it instead : componentWillReceiveProps()


      componentDidUpdate (prevProps, prevState) : most using : Updating the DOM in response to prop or state changes.

                                    - sau khi nhận params, nó se làm 1 cái gì đó

      componentWillUnmount() : Before DOM removal
                             - Most Common Use Case : clean up or delete component out : this place actions method do some things



  + DOM nodes

  + DOM Events


  + React API :

  using PROPS :  name = this.props.name
  useing STATE

<Hello name="Benjamin" />
*/
import React from 'react';
import ReactDOM from 'ReactDOM';

class Hello extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      name : props.name
    }
  }
  render(){

    return (

      const {name} = this.state ;

      <div class="message-box">
          hello { name }
      </div>
    )
  }
}

function MyComponent(props = {}){
  return (
    <div className="message-box">
        hello { props.name }
    </div>
  );
}
