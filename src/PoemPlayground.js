import React from 'react';
import WordDiv from './WordDiv.js'
import SaveButton from './SaveButton.js'
import { connect } from 'react-redux';
import { createPoem } from './actions/poems.js'

class PoemPlayground extends React.Component {

	eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  constructor(props) {
    super(props)
    this.state = {
      deltaPosition: {
        x: null, y: null
      },
			poem: [],
    }
  }

  handleDrag = (e) => {
    this.setState({
      deltaPosition: {
        x: e.x,
        y: e.y,
      },
    });
  }

  onStop = (position, word) => {
		let posx = position.x
		let posy = position.y
		let w = word
		let poemWord = { text: w, x: posx, y: posy }

		let poemArray = this.state.poem
		let filtered = poemArray.filter(word => word.text !== w)
		let poems = filtered.concat(poemWord)

		console.log(poemWord)
    this.setState({
			activeDrags: --this.state.activeDrags,
			poem: poems
		});
  }

	handleSubmit = (event) => {
		event.preventDefault();
		console.log(this.state.poem)
		const array = this.state.poem
		const data =
			{
			  "poem": {
			  	"magnet": array
			  }
			}
		this.props.createPoem(data)
	}

  render() {

		const {deltaPosition} = this.state;

		const mappedWords = this.props.words.map((w, index) => {
			return <WordDiv ref="child" word={w} value={w} key={index} onStart={this.onStart} onStop={this.onStop}  position={deltaPosition} handleDrag={this.handleDrag} />
		})

		return(
			<div>
				{mappedWords}
				<hr className="line"/>
				<SaveButton handleSubmit={this.handleSubmit}/>
			</div>
		)
  }

}

function mapDispatchToProps(dispatch){
  return{
    createPoem: (params) => {
      dispatch(createPoem(params))
    }
  }
}

export default connect(null, mapDispatchToProps)(PoemPlayground)
