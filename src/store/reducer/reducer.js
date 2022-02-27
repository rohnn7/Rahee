import * as actions from '../actions/actionType'

const initialState ={
    counter:0,
    userdata:null
}
 const reducer = (state=initialState, action)=>{
    switch(action.type){
        case(actions.INCREMENT):
            return{
                ...state,
                counter: state.counter+1
            }  
                             
        default:
            return state    
    }
 }

 export default reducer