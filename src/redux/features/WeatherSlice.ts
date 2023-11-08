import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const apiKey = '';
const city = 'Lahore';
const country = 'PK'; // Country code for Pakistan

interface DataState {
  loading: boolean;
  data: null | {};
  error: string | null;
}

export const getWeather = createAsyncThunk(
  'weather',
  async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
      );
      return response.data;
    } catch (err) {
      return err.message;
    }
  },
);

const initialState: DataState = {
  loading: false,
  data: {},
  error: '',
};

export const WeatherReducer = createSlice({
    name: 'weatherData',
    initialState,
    extraReducers: builder => {
        builder.addCase(
            getWeather.fulfilled,
            (state, action: PayloadAction) => {
                state.loading = false;
                state.data = action.payload;
            }
        );

        builder.addCase(getWeather.pending, state => {
            state.error = '';
            state.loading = true;
        });

        builder.addCase(getWeather.rejected, state => {
            state.loading = false;
        });
    },
    reducers: undefined
});
export default WeatherReducer.reducer;
