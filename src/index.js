import React from 'react'
import App from './App'
import ReactDOM, { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { Provider } from 'react-redux';

const rootNode = document.getElementById('root')
const root = createRoot(rootNode)
root.render(
    <BrowserRouter>
        <Provider store={store}>
<App/>
        </Provider>
    </BrowserRouter>

)