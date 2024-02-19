import { combineReducers } from '@reduxjs/toolkit';
import ticketsReducer from './tickets';
import usersReducer from './users';
import commonsReducer from './common';

const rootReducer = combineReducers({
  tickets: ticketsReducer,
  users: usersReducer,
  commons: commonsReducer,
});

export default rootReducer;
