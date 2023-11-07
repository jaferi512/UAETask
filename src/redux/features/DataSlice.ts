import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import mockApi from '../../mockApi';

interface DataState {
  loading: boolean;
  data: [];
  sensors: [],
  error: string | null;
  socketStatus:  boolean;
}

export const getSensors = createAsyncThunk(
  'sensors',
  async () => {
    try {
      const response = await mockApi.getSensors();
      return response;
    } catch (err) {
      return err.message;
    }
  },
);

const initialState: DataState = {
  loading: false,
  socketStatus: false,
  data: [],
  sensors: [],
  error: '',
};

export const DataReducer = createSlice({
  name: 'realData',
  initialState,
  reducers: {
    receiveSocketData(state, action) {
      state.data = action.payload;
    },
    receiveSocketStatus(state, action) {
      state.socketStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(
      getSensors.fulfilled,
      (state, action: PayloadAction) => {
        state.loading = false;
        state.sensors = action.payload;
      },
    );

    builder.addCase(getSensors.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(getSensors.rejected, state => {
      state.loading = false;
    });
  }
});
export const { receiveSocketData, receiveSocketStatus } = DataReducer.actions;
export default DataReducer.reducer;
