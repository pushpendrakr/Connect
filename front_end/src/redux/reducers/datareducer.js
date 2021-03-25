import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    posts: [],
    post: {},
    post1:{},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case 'INITIALIZE':
          return initialState;
        
      case SET_SCREAMS:
        return {
          ...state,
          posts: action.payload,
          loading: false
        };
      case SET_SCREAM:
        return {
          ...state,
          post: action.payload
        };
      case LIKE_SCREAM:
        let index=state.posts.findIndex((p)=>p._id===action.payload._id)
        state.posts[index]=action.payload;
        return {
            ...state
        }

      case UNLIKE_SCREAM:
         let index1=state.posts.findIndex((p)=>p._id===action.payload._id)
        state.posts[index1]=action.payload;
        return {
            ...state
        }

        
      case DELETE_SCREAM:
         let index2 = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts.splice(index2, 1);
        return {
          ...state
        };
      case POST_SCREAM:
        return {
          ...state,
          posts: [action.payload, ...state.posts]
        };
      case SUBMIT_COMMENT:
        let index3=state.posts.findIndex((p)=>p._id===action.payload._id)
        state.posts[index3]=action.payload;
        return {
            ...state
        }
        case 'SET_SCREAM1':
          return {
            ...state,
            post1: action.payload
          };
      default:
        return state;
    }
  }