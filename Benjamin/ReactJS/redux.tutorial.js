/*
REDUX
    I. Motivate
      STATE
      - server response
      - Cached data
      - Locally created data

    II. Core concept : let imagagin the state like object

      data = {
        list:[],                         // DATA
        visibilyFilter :'SHOW_COMPLETED' // lastest status infomation about this DATA
      }

      - to change something in this STATE need to dispatch an ACTION
        DISPATCH ACTIONS  : acions - status - current

        METHOD :

        CREATE - DELETE :
        POST = {
          "type":"ADD_TODO",
          "text":"text name to do"
        }

        UPDATE
        SET = {
          "type":"TOGGLE_TODO",
          "index":1
        }

        READ :
        GET = {
          "type":"SET_VISIBILITY_FILTER",
          "filter":"SHOW_ALL"
        }

    III. Three principle :
        1. Single source
        2. STATE is read only
        3. change are make with pure function : reducers

     IV. Basic  :


        1. Reducers -> Store : combineReducers({}) // one Big Data Object
            import { combineReducers } from 'redux';
            import reducerField1 from './reducer-field';

            const allReducers = combineReducers({
                field1 : reducerField1
            });

            export default allReducers


        2. Store -> Provider :

                // Passing data to Root Compoment
                import { Provider } from  'react-redux';
                import { createStore } from 'redux';
                import allReducers from 'reducers';

                const store = createStore(allReducers);
                <Provider store={ store }>
                    <App/>
                </Provider>

        3. Provider -> Container : pages : -> Components
              // Getting data from root component via : mapStateToProps()
              import { connect } from 'react-redux';

              function mapStateToProps(state){
                 return {
                    field:state.field
                 }
             }
             export default connect(mapStateToProps)(thisComponent)


        4. Component -> Actions
            // passing dispatch to props
            import { bindActionCreators } from 'redux';
            function matchDispatchToProps(dispatch){
              return bindActionCreators({
                action(list){
                  return {
                    type:"ACTION_TYPE",
                    payload:list
                  }
                }
              }, dispatch)
           }

        5. Actions -> Reducers :




*/
