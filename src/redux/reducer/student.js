
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncAction } from "../action";

const studentList = createAsyncAction("studentList", "studentList");
const addStudent = createAsyncAction("addStudent","addStudent");
const editStudent = createAsyncAction("editStudent","editStudent");
const deleteStudent = createAsyncAction("deleteStudent","deleteStudent");
const addStudentTask = createAsyncAction("addStudentTask","addStudentTask");
const getStudentTask = createAsyncAction("getStudentTask","getStudentTask")
const initialState = {
  studentData:[],
  studentTask:[],
}

export const counterSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    updateAuthState: (state, action) => Object.assign(state, action.payload),
  },
  extraReducers: {
    [studentList.fulfilled]: (state, { payload }) => {
        state.studentData = payload;
    },
    [getStudentTask.fulfilled]: (state, { payload }) => {
      state.studentTask = payload.data;
  },
  },
});

const { updateAuthState } = counterSlice.actions;

export { updateAuthState, studentList,addStudent,editStudent,deleteStudent,addStudentTask,getStudentTask};

export default counterSlice.reducer;