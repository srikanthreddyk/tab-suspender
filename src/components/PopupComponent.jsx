import React from 'react'

class PopupComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			activeTab: this.props.activeTab,
			isTabSuspended: this.props.isTabSuspended
		}
	}

	suspendTab = () => {
		this.setState({
			isTabSuspended: true
		});
		let activeTab = this.state.activeTab;
		let suspendedUrl = browser.extension.getURL("suspended.html#"+encodeURIComponent(activeTab.url));
		browser.storage.local.get("suspendedTabs", (items)=> {
			let suspendedTabs = items.suspendedTabs ? items.suspendedTabs : {};
			suspendedTabs[activeTab.id] = { tabId: activeTab.id, tabUrl: activeTab.url};
			browser.storage.local.set({suspendedTabs});
		});

		browser.tabs.update(activeTab.id, {url: suspendedUrl}, function(tab) {
			browser.tabs.onUpdated.addListener(function listener(tabId, changeInfo) {
				if (tabId === tab.id && changeInfo.status == 'complete') {
					browser.tabs.onUpdated.removeListener(listener);
					browser.tabs.sendMessage(tabId, { 
						type: "suspend",
						data: {
							tabId: tab.id,
							suspendedUrl: activeTab.url,
						}
					});
				}
			});
		});
		
	}

	unsuspendTab = () => {
		this.setState({
			isTabSuspended: false
		});
		let activeTab = this.state.activeTab;
		browser.storage.local.get("suspendedTabs", (items) => {
			let suspendedTabs = items.suspendedTabs ? items.suspendedTabs : {};
			let originalUrl = suspendedTabs[activeTab.id].tabUrl;
			alert(originalUrl);
			delete suspendedTabs[activeTab.id];
			browser.storage.local.set({suspendedTabs});
			// go back to previous url
			browser.tabs.update(activeTab.id, {url: originalUrl});
		});
	}

	goToOptions = () => {
		//alert("Hi")
		let optionsUrl = browser.extension.getURL("options.html");
		browser.tabs.create({active: true, url: optionsUrl})
	}

	render() {
		return (
			<div className="option-list">
				{!this.state.isTabSuspended
					? <div className="popup-option"> 
						<button className="button" onClick={this.suspendTab}>
							Suspend current tab
						</button>
					  </div>
					: <div className="popup-option">
						<button className="button" onClick={this.unsuspendTab}>
							Unsuspend this tab
						</button>
					  </div>
				}
				<div className="popup-option">
					<button className="button" onClick={this.handleClick}>
						Suspend all tabs
					</button>
				</div>
				<div className="popup-option">
					<button className="button" onClick={this.handleClick}>
						Unsuspend all tabs
					</button>
				</div>
				
				<hr></hr>
				<div className="popup-option"> 
				<button className="button" onClick={this.goToOptions}>
					Options
				</button>
				</div>
			</div>
		)
	}
}

export default PopupComponent;