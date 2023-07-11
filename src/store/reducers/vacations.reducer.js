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

      // acceptVacationAdmin
      .addCase(vacationsActions.acceptVacationAdmin.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.acceptVacationAdmin.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.acceptVacationAdmin.rejected, (state) => {
        state.fixWaiter = false;
      })

      // cancelVacationAdmin
      .addCase(vacationsActions.cancelVacationAdmin.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.cancelVacationAdmin.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.cancelVacationAdmin.rejected, (state) => {
        state.fixWaiter = false;
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
      })

      // acceptVacationHr
      .addCase(vacationsActions.acceptVacationHr.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.acceptVacationHr.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.acceptVacationHr.rejected, (state) => {
        state.fixWaiter = false;
      })

      // cancelVacationHr
      .addCase(vacationsActions.cancelVacationHr.pending, (state) => {
        state.fixWaiter = true;
      })
      .addCase(vacationsActions.cancelVacationHr.fulfilled, (state, action) => {
        state.vacations = state.vacations.map((item) => {
          if (item.id === action.meta.arg) {
            return action.payload.data.data;
          }
          return item;
        });
        state.fixWaiter = false;
      })
      .addCase(vacationsActions.cancelVacationHr.rejected, (state) => {
        state.fixWaiter = false;
      });
  },
});

export const { clearErrors } = vacationsSlice.actions;
export default vacationsSlice.reducer;
