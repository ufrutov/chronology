import React from 'react';
import OMDb from './OMDb';
import Desk from './Desk'
import Side from './Side'


class Viewport extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			active: 0,
			desk: [OMDb.getDefault()],
			cards: [],
			total: [],
			failed: 0
		};

		this.placeCard = this.placeCard.bind(this);
		this.selectCard = this.selectCard.bind(this);
	}

	componentDidMount() {
		OMDb.load(106, data => {
			const first = [data[0]];
			const cards = data.slice(1, 6);
			const total = data.slice(6);

			this.setState({
				desk: first,
				cards: cards,
				total: total,
				active: Math.floor(cards.length / 2)
			});
		});
	}

	placeCard(index, place) {
		const target1 = this.state.desk[index];
		const over = this.state.cards[this.state.active];
		let active = this.state.active;
		let desk = this.state.desk;
		let cards = this.state.cards;
		let total = this.state.total;
		let fail = false;

		if( cards.length > 0 ) {
			if( place === "next" ) {
				if( over.year >= target1.year ) {
					desk.splice(index+1, 0, over);
				} else {
					fail = true;
				}
			}

			if( place === "prev" ) {
				if( target1.year >= over.year ) {
					if( index === 0 ) {
						desk.splice(index, 0, over);
					} else {
						desk.splice(index-1, 0, over);
					}
				} else {
					fail = true;
				}
			}

			if( place === "between" ) {
				const target2 = this.state.desk[index-1];
				if( over.year >= target2.year && target1.year >= over.year ) {
					desk.splice(index, 0, over);
				} else {
					fail = true;
				}
			}

			if( total.length > 0 ) {
				// Update user cards set
				cards.splice(this.state.active, 1, this.state.total[0]);
				// Remove card from total set
				total.splice(0, 1);
			} else {
				cards.splice(this.state.active, 1);
			}

			if( active > cards.length-1 ) {
				active = 0;
			}

			if( fail ) {
				this.setState({
					failed: this.state.failed+1,
					active: active,
					cards: cards,
					total: total
				});
			} else {
				this.setState({
					desk: desk,
					active: active,
					cards: cards,
					total: total
				});
			}
		} else {
			console.warn('[W] Viewport.js - No cards left!');
		}
	}

	selectCard(index) {
		this.setState({ active: index });
	}

	render() {
		return <div className="ch-viewport">
			<div className="ch-desk">
				<Desk
					desk={this.state.desk}
					onCardPlace={this.placeCard} />
			</div>
			<div className="ch-side border-t bg-white">
				<Side
					desk={this.state.desk}
					active={this.state.active}
					cards={this.state.cards}
					total={this.state.total}
					failed={this.state.failed}
					onCardSelect={this.selectCard} />
			</div>
		</div>
	}
}

export default Viewport;
