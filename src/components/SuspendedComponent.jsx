import React from 'react';

class SuspendedComponent extends React.Component {
    reloadTab = () => {
        browser.runtime.sendMessage(
            { 
                type: "unsuspend",
                data: {
                    tabId: this.props.tabId,
                    suspendedUrl: this.props.suspendedUrl
                }
            }
        );
    };

    render() {
        return(
            <div className="suspended">
                <p>
                    {this.props.tabId}
                </p>
                <button onClick={this.reloadTab}>
                    Tab Suspended! Click to reload
                </button>
            </div>
        );
    }
}

export default SuspendedComponent