// src/features/brands/selectedBrandSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brand } from '@/types';

interface SelectedBrandState {
  selectedBrand: Brand | null;
}

const initialState: SelectedBrandState = {
  selectedBrand: null,
};

const selectedBrandSlice = createSlice({
  name: 'selectedBrand',
  initialState,
  reducers: {
    selectBrand(state, action: PayloadAction<Brand>) {
      state.selectedBrand = action.payload;
    },
    clearSelectedBrand(state) {
      state.selectedBrand = null;
    },
  },
});

export const { selectBrand, clearSelectedBrand } = selectedBrandSlice.actions;
export default selectedBrandSlice.reducer;
