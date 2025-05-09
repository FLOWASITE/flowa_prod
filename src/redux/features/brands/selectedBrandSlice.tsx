// src/features/brands/selectedBrandSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedBrandState {
  brandId: string | null;
}

const initialState: SelectedBrandState = {
  brandId: null
};

const selectedBrandSlice = createSlice({
  name: 'selectedBrand',
  initialState,
  reducers: {
    selectBrand(state, action: PayloadAction<string>) {
      state.brandId = action.payload;
    },
    clearSelectedBrand(state) {
      state.brandId = null;
    }
  }
});

export const { selectBrand, clearSelectedBrand } = selectedBrandSlice.actions;
export default selectedBrandSlice.reducer;
