import React from 'react';

class SuspendedComponent extends React.Component {
    render() {
        return(
            <div className="suspended">
                <p>
                    {this.props.tab.id}
                    <hr/>
                    {this.props.tab.url}
                </p>
            </div>
        );
    }
}

export default SuspendedComponent;