import React, { Component } from 'react';

export default class Options extends Component {
	render() {
		return (
			<button className="button">
				Click me!
			</button>
		);
	}
}

ReactDOM.render(<Options/>, document.getElementById('root'));