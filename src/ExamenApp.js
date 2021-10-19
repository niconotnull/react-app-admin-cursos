import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { RouterApp } from './router/RouterApp';

export const ExamenApp = () => {
  return (
    <div>
      <Provider store={store}>
        <RouterApp />
      </Provider>
    </div>
  );
};
