import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'
import {store, StoreContext } from './app/stores/Store'
import {RouterProvider} from "react-router-dom";
import { router } from './app/router/Routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <StoreContext.Provider value={store}>
          <RouterProvider router={router}/>
      </StoreContext.Provider>
  </React.StrictMode>,
)
