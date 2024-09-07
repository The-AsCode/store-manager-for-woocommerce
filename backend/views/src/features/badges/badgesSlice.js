import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: 'custom',
  position: 'top-right',
  styles: {
    color: '#ffffff',
    backgroundColor: '#000000',
    height: 30,
    width: 100,
    margin: 5,
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
