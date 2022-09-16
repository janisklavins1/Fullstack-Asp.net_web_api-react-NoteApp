import { combineReducers } from "redux";
import bookReducer from "./book/bookReducer";
import noteReducer from "./note/noteReducer";

 const rootReducer = combineReducers({
    book: bookReducer,
    notes: noteReducer
});

export default rootReducer;
