import {Component} from "react"
import Stopwatch from "./Stopwatch";

export default class StopwatchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stopwatches: [{
        elapsedTime: 0,
        label: 'Stopwatch',
        isPaused: true,
        isSelected: false
      }]
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-body">
          {this.state.stopwatches.map(stopwatch => (<Stopwatch stopwatch={stopwatch} />))}
        </div>
        <footer className="app-footer">
          <button type="button" className="button-primary">Add</button>
        </footer>
      </div>
    )
  }
}
