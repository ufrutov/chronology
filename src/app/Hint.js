import React from 'react';

class Hint extends React.Component {
	render () {
		return <React.Fragment>
			<div className="ch-hint ch-hint--cards fade show popover bs-popover-top">
				<div className="arrow"></div>
				<div className="popover-body py-1 px-2">
					<strong>1.</strong> Select card from your hand
				</div>
			</div>
			<div className="ch-hint ch-hint--desk fade show popover bs-popover-top">
				<div className="arrow arrow--left"></div>
				<div className="arrow arrow--right"></div>
				<div className="popover-body py-1 px-2 ta-center">
					<strong>2.</strong> Place (click/tap) selected card between cards on the desk, keep the dates order
				</div>
			</div>
		</React.Fragment>
	}
}

export default Hint;