
import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI,SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'
import {getPosts1} from './dataaction.js'


export const loginUser=(userdata,history)=>(dispatch)=>{

 
 axios.post('/api/login',userdata)
 .then(res=>{         
         dispatch(getUserdata())
       
         dispatch({type:CLEAR_ERRORS})
        history.push('/')
 })
 .catch(err=>{if(err.response){
     dispatch({
         type:SET_ERRORS,
         payload:err.response.data
     })}
 }) 
}
export const signupUser=(userdata,history)=>(dispatch)=>{
   
    axios.post('/api/signup',userdata)
    .then(res=>{
      
      // dispatch(getUserdata());
      //   dispatch({type:CLEAR_ERRORS})
           history.push('/login')
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
       dispatch({
         type:'INITIALIZE'
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
      dispatch(getPosts1());
      dispatch(suggesteduser());
     })
     .catch(err=>{console.log(err)})
}

export const uploadImage = (formData) => (dispatch) => {
  
    axios
      .put('/api/uploadpic', formData)
      .then(() => {
        dispatch(getUserdata());
       
       
      })
      .catch((err) => console.log(err));
  };
  export const uploadImage1 = (formData) => (dispatch) => {
  
    axios
      .put('/api/postpic', formData)
      .then(() => {
        dispatch(getUserdata());
       
      })
      .catch((err) => console.log(err));
  };
  export const editUserDetails = (userDetails) => (dispatch) => {
  
    axios
      .put('/api/editdetails', userDetails)
      .then(() => {
        dispatch(getUserdata());
      
      })
      .catch((err) => console.log(err));
  };
  export const followuser = (userid) => (dispatch) => {
  
    axios
      .put('/api/follow', {id:userid})
      .then(() => {
        dispatch(getUserdata());
       
      })
      .catch((err) => console.log(err));
  };
  export const unfollowuser = (userid) => (dispatch) => {
  
    axios
      .put('/api/unfollow', {id:userid})
      .then(() => {
        dispatch(getUserdata());
       
      })
      .catch((err) => console.log(err));
  };
  
export const suggesteduser=()=>(dispatch)=> {
  
  axios
    .get('/api/suggesteduser')
    .then((res) => {
    
      dispatch({
        type:'SUGGESTED_USER',
        payload:[...res.data]
    })
    })
    .catch((err) => console.log(err));
};
export const markNotificationsRead=()=>(dispatch)=>{
  axios.post('/api/notifications')
  .then(res=>{
    dispatch(getUserdata());
  })
}