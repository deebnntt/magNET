import React from 'react'
import Draggable from 'react-draggable';
import TitleForm from './TitleForm.js'
import { connect } from 'react-redux';
import { updatePoem } from '../actions/poems.js'

class TitleCard extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        title: null
      }
  }

  componentDidMount() {

	}

  handleSubmit = (input) => {
    const id = this.props.poemId
    this.setState({
      title: input
    })
    const data =
      {
        "title": input
      }
    this.props.updatePoem(id, data)
  }

  

  render() {
    return (
      <Draggable handle=".handle">
        <div>
            <div className="handle">drag me</div>
              <div className="title-card">
                <h3>{ this.state.title ? this.state.title : "Untitled"}</h3>
                <TitleForm handleSubmit={this.handleSubmit}/>
              </div>
          </div>
      </Draggable>
    )
  }
}

function mapDispatchToProps(dispatch){
  return ({
    updatePoem: (id, data) => dispatch(updatePoem(id, data))
  })
}

export default connect(null, mapDispatchToProps)(TitleCard)
