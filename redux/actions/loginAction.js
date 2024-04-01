import {SET_LOGIN_LIST, GET_LOGIN_LIST } from "../actionType";

export const setLoginData=(payload)=>{
    console.log("login list action called",payload);
    return {
        type: SET_LOGIN_LIST,
        payload
    };
}

export const getListTable=(payload)=>{
return{
    type:GET_LOGIN_LIST,
    payload
}
}