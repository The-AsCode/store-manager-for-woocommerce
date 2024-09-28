// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  badge_name: '30% Off All Products',
  badge_type: 'custom',
  position: 'top-right',
  badgeText: 'Badge Text',
  badge_styles: {
    color: '#ffffff',
    backgroundColor: '#000000',
    height: 36,
    width: 100,
    margin: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: 14,
    fontWeight: 700,
    borderWidth: 1,
    borderColor: '#007CF5',
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
      state.badge_styles[action.payload.property] = action.payload.value;
    },
  },
});

export const { changeBadgeSetting, updateStyles } = badgesSlice.actions;
export default badgesSlice.reducer;
