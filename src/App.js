import React, { Component } from 'react';
import './App.css'

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			count: 0,
			counting: false,
			splits: [],
			highlightedIndex: -1,
		}
	}

	//when given an integer, returns a string in the format X:XX:XX
	formatTime(int){
		let centiseconds = parseInt(int % 100)
		centiseconds = centiseconds > 9 ? centiseconds : '0' + centiseconds

		let seconds = parseInt(int / 100 % 60)
		seconds = seconds > 9 ? seconds : '0' + seconds

		const minutes = parseInt(int / 6000)

		return `${minutes}:${seconds}:${centiseconds}`
	}

	clickStopwatch(){
		//starts the count initially
		if(!this.state.counting) this.setState({counting: true})

		//otherwise adds a split to this.state.splits
		else this.setState({splits: this.state.splits.concat(this.state.count)})
	}

	clickSplit({split, index}){
		//removes splits below the selected split
		const newSplits = this.state.splits.slice(0, index + 1)

		//updates list of splits, highlights the selected split, and resets the clock to split time
		this.setState({
			splits: newSplits,
			highlightedIndex: index,
			count: split,
			//not clear from the prompt whether the stopwatch should pause upon a split click,
			//but if not comment out the following line:

			counting: false,
		})
	}

	//increments this.state.count every 10 milliseconds as soon as component mounts
	componentDidMount(){
		setInterval(() => {
			if(this.state.counting) this.setState({count: this.state.count + 1})
		}, 10)
	}

	render() {

	return (
		<div id="main">
			<div onClick={() => this.clickStopwatch()} id="stopwatch">
				{
					this.formatTime(this.state.count)
				}
			</div>
			<ul>
				{
					this.state.splits.map((split, index) => {
						return <li
							className={index == this.state.highlightedIndex ? 'highlighted' : undefined} 
							onClick={() => this.clickSplit({split, index})}
						>
							{this.formatTime(split)}
						</li>
					})
				}
			</ul>
		</div>
	);
	}
}

export default App;
