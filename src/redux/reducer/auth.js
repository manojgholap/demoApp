
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncAction } from "../action";

const login = createAsyncAction("login", "login");
const register = createAsyncAction("register","register");
const getCurrentUser = createAsyncAction("getCurrentUser","getCurrentUser");
const logout = createAsyncAction("logout","logout");
const initialState = {
  token: "",
  user: {},
  isSignningIn: false,
}

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthState: (state, action) => Object.assign(state, action.payload),
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.isSignningIn = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      if (payload.status) {
        state.status = true;
        state.token = payload.token;
        state.isSignningIn = false;
      } else {
        state.isSignningIn = false;
      }
    },
    [login.rejected]: (state, { payload }) => {
      console.log("error....")
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
        state.user = payload;
    },
  [logout.fulfilled]: (state, { payload }) => {
    state.token = null;
},
  },
});

const { updateAuthState } = counterSlice.actions;

export { updateAuthState, login,getCurrentUser,register,logout };

export default counterSlice.reducer;