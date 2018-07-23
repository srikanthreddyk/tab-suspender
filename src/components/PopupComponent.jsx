import React, {Component} from 'react';
import {Button} from 'antd';

class PopupComponent extends Component {
	constructor(props) {
		super(props)
	}
	
	suspendTab = () => {
		browser.runtime.sendMessage({
			actionType: "suspend_from_popup",
			data: {tab: this.props.currentTab}
		});
		window.close();
	}

	unsuspendTab = () => {
		browser.runtime.sendMessage({
			actionType: "unsuspend_from_popup",
			data: {tab: this.props.currentTab}
		});
		window.close();
	}

	goToSettings = () => {
		let settingsUrl = browser.runtime.getURL("settings.html");
		browser.tabs.create({active: true, url: settingsUrl})
		window.close();
	}

	render() {
		return (
			<div className="option-list">
				{!this.props.isTabSuspended
					? 	<Button className="button" icon="pause-circle-o" onClick={this.suspendTab}>
							Suspend this tab
						</Button>
					: 	<Button className="button" icon="play-circle-o" onClick={this.unsuspendTab}>
							Unsuspend this tab
						</Button>
				}

				<Button className="button" icon="pause-circle-o" onClick={this.suspendAllTabs}>
					Suspend all tabs
				</Button>

				<Button className="button" icon="play-circle-o" onClick={this.unsuspendAllTabs}>
					Unsuspend all tabs
				</Button>
				<hr></hr>
				<Button className="button" icon="setting" onClick={this.goToSettings}>
					Settings
				</Button>
			</div>
		)
	}
}

export default PopupComponent;