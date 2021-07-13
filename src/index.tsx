import "reflect-metadata";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {store} from "./redux/store";
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
// import { TouchBackend } from 'react-dnd-touch-backend';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<DndProvider backend={TouchBackend}>*/}
            <DndProvider backend={HTML5Backend}>
                <App/>
            </DndProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your data, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
