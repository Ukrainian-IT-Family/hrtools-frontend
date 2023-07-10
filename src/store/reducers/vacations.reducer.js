import { createSlice } from '@reduxjs/toolkit';

import { vacationsActions } from '../actions';

const vacationsSlice = createSlice({
  name: 'vacations',
  initialState: {
    vacations: [],
    vacationsMeta: [],
    errors: false,
    waiter: false,
    fixWaiter: false,
  },
  reducers: {
    clearErrors(state) {
      state.errors = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getVacationsAdmin
      .addCase(vacationsActions.getVacationsAdmin.pending, (state) => {
        state.waiter = true;
      })
      .addCase(vacationsActions.getVacationsAdmin.fulfilled, (state, action) => {
        state.vacations = action.payload.data.data;
        state.vacationsMeta = action.payload.data.meta;
        state.waiter = false;
      })
      .addCase(vacationsActions.getVacationsAdmin.rejected, (state) => {
        state.waiter = false;
      })

      // getVacationsHr
      .addCase(vacationsActions.getVacationsHr.pending, (state) => {
        state.waiter = true;
      })
      .addCase(vacationsActions.getVacationsHr.fulfilled, (state, action) => {
        state.vacations = action.payload.data.data;
        state.vacationsMeta = action.payload.data.meta;
        state.waiter = false;
      })
      .addCase(vacationsActions.getVacationsHr.rejected, (state) => {
        state.waiter = false;
      });
  },
});

export const { clearErrors } = vacationsSlice.actions;
export default vacationsSlice.reducer;
