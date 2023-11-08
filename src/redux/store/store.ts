import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import DataReducer from '../features/DataSlice';
import WeatherReducer  from '../features/WeatherSlice';

const rootReducer = combineReducers({
  main: DataReducer,
  weather: WeatherReducer,
});
const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export {store};
