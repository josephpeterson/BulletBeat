import React from "react";
export default class ScreenManager extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			screenComponent: undefined
		}
	}
	render() {
		var Comp = this.state.screenComponent;
		if(!Comp)
			return <div></div>;
		return <div>
			<Comp ref="screenComponent" game={this.game}></Comp>
		</div>;
	}
	componentDidMount() {
		//setTimeout(() => this.createNewGame(), 0);
	}
	switchToScreen(component) {
		this.setState({
			screenComponent: component
		});
	}
}