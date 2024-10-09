// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  badge_name: '30% Off All Products',
  badge_type: 'custom',
  valid_from: '',
  valid_to: '',
  badge_settings: {},
  filter: 'all',
  badge_style: '',
};

const badgesSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    changeBadgeBaseProperties: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },

    changeBadgeSettingProperties: (state, action) => {
      state.badge_settings[action.payload.name] = action.payload.value;
    },
  },
});

export const { changeBadgeBaseProperties, changeBadgeSettingProperties } = badgesSlice.actions;
export default badgesSlice.reducer;
