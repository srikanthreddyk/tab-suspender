import React from 'react';
import ReactDOM from 'react-dom';
import SuspendedComponent from './components/SuspendedComponent.jsx';
import './styles.css';
/* jshint-disable no-undef */
/* eslint-disable no-undef */
function suspendedPageListener(request, sender, sendResponse) {
    ReactDOM.render(<SuspendedComponent {...request.data}/>, document.getElementById('root'));
};

browser.runtime.onMessage.addListener(suspendedPageListener);
