
import { combineReducers } from 'redux'
import auth from './auth';
import student from './student';

const rootReducer = combineReducers({
    auth,
    student
});

export default rootReducer;