import React from 'react';

class Side extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			debug: false
		}

		this.selectCard = this.selectCard.bind(this);
	}

	componentDidMount() {
		let params = (new URL(document.location)).searchParams;

		if( params.get('debug') ) {
			this.setState({ debug: true });
		}
	}

	selectCard(index) {
		if( this.props.hasOwnProperty('onCardSelect') ) {
			this.props.onCardSelect(index);
		} else {
			console.error('[E] Side.js - No action "onCardSelect"');
		}
	}

	render () {
		const active = this.props.active;
		const desk = this.props.desk;
		const cards = this.props.cards;
		const total = this.props.total;
		const failed = this.props.failed;
		return <React.Fragment>
			<div className="ch-side--pack">
				{ ( cards.length > 0 ) ? (
					cards.map((c, i) => <div className={`ch-desk--item ${(active === i) ? "active" : ""}`}
						key={i}
						title={`${c.name} (${c.author})`}
						onClick={e => this.selectCard(i)}>
						<div className="preview" style={{ backgroundImage: `url(${c.preview})` }}></div>
						<div className="desc">
							<div className="title">{c.name}</div>
							<div className="author">{ this.state.debug ? `[${c.year}]` : null } {c.author}</div>
						</div>
					</div>)
					) : (
						<div className="ch-result">
							<h3 className="title">Cards with correct order: {desk.length}</h3>
							<h6 className="failed">Wrong dates: {failed}</h6>
							<button className="btn btn-primary mt-2 px-4" onClick={ e => { window.location.reload(true) } }>Play again!</button>
						</div>
					) }
			</div>
			<div className="ch-side--counters border-t">
				<div className="counter--total">Total cards: {total.length}</div>
				<div className="counter--failed border-l">Wrong dates: {failed}</div>
			</div>
		</React.Fragment>;
	}
}

export default Side;