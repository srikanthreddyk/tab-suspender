import React from 'react';
import ReactDOM from 'react-dom';
import PopupComponent from './components/PopupComponent.jsx';
import './styles.css';
/* jshint-disable no-undef */
/* eslint-disable no-undef */

browser.storage.local.get("suspendedTabs", (items)=>{
    let suspendedTabs = items.suspendedTabs ? items.suspendedTabs : {};
    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let tabId = tabs[0].id;
        let isTabSuspended = suspendedTabs[tabId] ? true : false;
        ReactDOM.render(<PopupComponent isTabSuspended={isTabSuspended} activeTab={tabs[0]}/>, document.getElementById('popup-root'));
    });
});
