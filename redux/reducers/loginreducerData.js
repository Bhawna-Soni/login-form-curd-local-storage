import { SET_LOGIN_LIST,GET_LOGIN_LIST } from "../actionType";

const initialState = {
  loginList: [],
  showList:[]
};

export const loginreducerData = (state = initialState, action) => {
  
  // if (action.type === GET_PRODUCT_LIST) {
  //   return productdata;
  // } else {
  //   // should return something
  //   return 0;
  // }

  // now use switch case
  switch (action.type) {
    case SET_LOGIN_LIST:
      console.log("this is reducer", action);
      return {
        ...state,
        loginList:[action.payload]
      }
      case GET_LOGIN_LIST:
        console.warn("PRODUCT_LIST condition ", action)
        return {
          ...state,
          showList: action.payload,
        }
    default:
      return state;
  }
};
