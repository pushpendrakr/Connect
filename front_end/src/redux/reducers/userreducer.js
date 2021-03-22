import {SET_USER,SET_ERRORS,CLEAR_ERRORS,LOADING_UI, SET_AUTHENTICATED, SET_UNAUTHENTICATED} from '../types'
import axios from 'axios'

const initialState={
    authenticated:false,
    credential:{},
    likes:{},
    notifications:[],
    suggestedusers:[]
}
export default function(state=initialState,action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated:true
            };
        case SET_UNAUTHENTICATED:
            return initialState
        case SET_USER:
        return {
            authenticated:true,
            ...action.payload,
        }
        case 'SUGGESTED_USER':
        return {
            ...state,suggestedusers:action.payload
        }
        
        default:
            return state
    }
}