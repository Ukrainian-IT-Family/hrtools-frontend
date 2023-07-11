import { createAsyncThunk } from '@reduxjs/toolkit';
import { vacationsService } from 'src/services';

export const getVacationsAdmin = createAsyncThunk(
  'admin/getVacationsAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.getVacationsAdmin(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getVacationsHr = createAsyncThunk(
  'admin/getVacationsHr',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.getVacationsAdmin(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const acceptVacationAdmin = createAsyncThunk(
  'admin/acceptVacationAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.acceptVacationAdmin(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const cancelVacationAdmin = createAsyncThunk(
  'admin/cancelVacationAdmin',
  async (data, { rejectWithValue }) => {
    try {
      const result = await vacationsService.cancelVacationAdmin(data);

      return result;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
