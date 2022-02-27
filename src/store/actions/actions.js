import * as actions from './actionType'
import axios from 'axios'
import {server} from '../../../server'

export const increment=()=>{
    return{
        type:actions.INCREMENT
    }
}

export const register=(data)=>{
    return{
        type:actions.REGISTER,
        payload:data
    }
}


export const onIncrement =()=>{
    return dispatch=>{
        dispatch(increment())
    }
}

export const onRegister = (userdata)=>{
    return dispatch =>{
        axios.post(server+'/register/', JSON.stringify(userdata))
              .then(response=>{
                console.log(response.data)    
                dispatch(register(response.data))
              })
              .catch(error=>{
                  console.log(error)
              })
    }
}