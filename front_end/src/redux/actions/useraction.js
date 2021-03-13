
import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI,SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'

export const loginUser=(userdata,history)=>(dispatch)=>{
 dispatch({type:LOADING_UI});
 axios.post('/api/login',userdata)
 .then(res=>{         dispatch(getUserdata())
         dispatch({type:CLEAR_ERRORS})
        history.push('/')
 })
 .catch(err=>{console.log(err.response.data)
     dispatch({
         type:SET_ERRORS,
         payload:err.response.data
     })
 }) 
}
export const signupUser=(userdata,history)=>(dispatch)=>{
   
    axios.post('/api/signup',userdata)
    .then(res=>{
            
            dispatch(getUserdata())
            dispatch({type:CLEAR_ERRORS})
           history.push('/')
    })
    .catch(err=>{console.log(err.response.data)
        dispatch({
            type:SET_ERRORS,
            payload:err.response.data
        })
    }) 
   }
export const logoutUser=()=>(dispatch)=>{
    axios.get('/api/logout')
    .then(res=>{
       dispatch({
           type:SET_UNAUTHENTICATED
       })
    })
    .catch(err=>{

    })
}
export const getUserdata=()=>(dispatch)=>{
    axios.get('/api/user')
    .then(res=>{
      dispatch({
          type:SET_USER,
          payload:res.data
      })
     })
     .catch(err=>{console.log(err)})
}