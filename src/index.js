// React 17
//import ReactDOM from 'react-dom';

// React 18
import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

/*/ libs
import $ from 'jquery';
import Popper from 'popper.js';*/
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { App } from './App';
import './index.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

