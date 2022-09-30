import { createAsyncThunk } from "@reduxjs/toolkit";
import service from "../services";

export const createAsyncAction = (type, fuName) =>
  createAsyncThunk(type, async (payload, thunkAPI) => {
    try {
      const response = await service[fuName](payload)
      const responsePayload = response.data;
      return responsePayload;
    } catch (error) {
      console.log("ERRORRRRRR>>>>>>>>>", error);
      return thunkAPI.rejectWithValue(error);
    }
  });