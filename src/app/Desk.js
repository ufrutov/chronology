import React from 'react';

class Desk extends React.Component {
	constructor(props) {
		super(props);

		this.deskScroll = this.deskScroll.bind(this);
		this.placeCard = this.placeCard.bind(this);
	}

	deskScroll(e) {
		var container = document.getElementById('desk');
		var containerScrollPosition = document.getElementById('desk').scrollLeft;

		container.scrollTo({
			top: 0,
			left: containerScrollPosition + e.deltaY * 2
		})
	}

	placeCard(index, place) {
		if( this.props.hasOwnProperty('onCardPlace') ) {
			this.props.onCardPlace(index, place);
		} else {
			console.error('[E] Desk.js - No action "onCardPlace"');
		}
	}

	render () {
		const items = this.props.desk;
		return <div id="desk" className="ch-desk--cards"
			onWheel={this.deskScroll}>
			{ items.map((i, index) => <div
				className="ch-desk--item"
				key={index}
				title={`${i.name} (${i.author})`}>
					<div className="content">
						<div className="preview" style={{ backgroundImage: `url(${i.preview})` }}></div>
						<div className="desc">
							<div className="title">{i.name}</div>
							<div className="author">{i.author}</div>
							<div className="year"><span>{i.year}</span></div>
						</div>
					</div>
					{ (index === 0) ? (
						<div className="prev--first" onClick={e => this.placeCard(index, "prev")}>
							<span className="hint hint--first">{i.year}</span>
						</div> ) : null }
					{ (index !== 0) ? (
						<div className="next" onClick={e => this.placeCard(index, "between")}>
							<span className="hint hint--left">{items[index-1].year}</span>
							<span className="hint hint--right">{i.year}</span>
						</div> ) : null }
					{ (index === items.length-1) ? (
						<div className="next--last" onClick={e => this.placeCard(index, "next")}>
							<span className="hint hint--last">{i.year}</span>
						</div> ) : null }
				</div>) }
			</div>
	}
}

export default Desk;