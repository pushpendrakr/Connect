import {
    SET_SCREAMS,
    LOADING_DATA,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    DELETE_SCREAM,
    SET_ERRORS,
    POST_SCREAM,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_SCREAM,
    STOP_LOADING_UI,
    SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  import {uploadImage1} from './useraction.js'
  // Get all screams
  export const getScreams = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/api/posts')
      .then((res) => {
        dispatch({
          type: SET_SCREAMS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_SCREAMS,
          payload: []
        });
      });
  };
  export const getPosts1= () => (dispatch) => {
    
    axios.get('/api/getsubpost')
      .then((res) => {//console.log(res.data)
        dispatch({
          type: SET_SCREAMS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_SCREAMS,
          payload: []
        });
      });
  };
  export const getScream = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/api/posts/${screamId}`)
      .then((res) => {
        dispatch({
          type: SET_SCREAM,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => {console.log(err)});
  };
  // Post a scream
  export const postScream = (newScream) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/api/createpost', newScream)
      .then((res) => {
        dispatch({
          type: POST_SCREAM,
          payload: res.data
        });console.log(newScream)
        if(newScream.postimage){
          const formData = new FormData();
          formData.append('postimage', newScream.postimage);
          formData.append('_id',res.data._id)
        dispatch(uploadImage1(formData))}
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  // Like a scream
  export const likeScream = (screamId) => (dispatch) => {
    axios
      .put(`/api/like`,{postId:screamId})
      .then((res) => {
        dispatch({
          type: LIKE_SCREAM,
          payload:res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a scream
  export const unlikeScream = (screamId) => (dispatch) => {
    axios
      .put(`/api/unlike`,{postId:screamId})
      .then((res) => {
        dispatch({
          type: UNLIKE_SCREAM,
          payload:res.data  
        });
      })
      .catch(err => {console.log(err)});
  };    
  // Submit a comment
  export const submitComment = (screamId, commentData) => (dispatch) => {
    axios
      .post(`/api/comments/`,{postId:screamId,text:commentData})
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  export const deleteScream = (screamId) => (dispatch) => {
    axios
      .delete(`/api/deletepost/${screamId}`)
      .then(() => {
        dispatch({ type: DELETE_SCREAM, payload: screamId });
      })
      .catch((err) => console.log(err));
  };
  
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/api/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_SCREAMS,
          payload: res.data
        });
      })
      .catch(() => {
        dispatch({
          type: SET_SCREAMS,
          payload: null
        });
      });
  };

  

  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };