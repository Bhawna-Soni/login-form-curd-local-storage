import { createStore } from "redux";
import rootReducer from "./rootReducer";


// const dataReducerPass=()=>{
//     return 0;
// }
// export const store=createStore(dataReducerPass);

export const store = createStore(rootReducer);

