import React from 'react';
import ReactDOM from 'react-dom/client';
import './Assets/Styles/custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './AppRoutes';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { init } from 'console-ban';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider } from './Components/ThemeContext';

// Import Font Awesome Library
import "./Utilities/FontAwesomeIcons";

if (process.env.REACT_APP_NODE_ENV === 'PRODUCTION') {
  init({
    redirect: '/unavailable',
  })
  disableReactDevTools();
  console.log = () => {}
  console.info = () => {}
  console.error = () => {}
  console.debug = () => {}
  console.clear();
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
