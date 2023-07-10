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
