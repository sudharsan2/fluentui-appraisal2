import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';

import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  
  <FluentProvider theme={webLightTheme} style={{height: "100vh", width: "100vw"}}>
  
    
    <App />
   
  </FluentProvider>
  
);
