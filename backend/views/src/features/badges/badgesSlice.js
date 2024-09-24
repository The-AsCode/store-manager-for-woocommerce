// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'custom',
  position: 'top-right',
  styles: {
    color: '#ffffff',
    backgroundColor: '#000000',
    height: 60,
    width: 60,
    margin: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: 16,
    fontWeight: 700,
  },
};

const badgesSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeBadgeSetting: (state, action) => {
      state[action.payload.setting] = action.payload.value;
    },
    updateStyles: (state, action) => {
      state.styles[action.payload.property] = action.payload.value;
    },
  },
});

export const { changeBadgeSetting, updateStyles } = badgesSlice.actions;
export default badgesSlice.reducer;
