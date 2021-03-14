import {Component} from "react"
import Stopwatch from "./Stopwatch";

export default class StopwatchContainer extends Component {
  constructor(props) {
    super(props);
    this.interval = props.interval;
    this.state = {
      stopwatches: [{
        id: 0,
        elapsedTime: 0,
        label: 'Stopwatch',
        isPaused: true,
        isSelected: false
      }]
    };
    this.updateStopwatchState = this.updateStopwatchState.bind(this);
    this.tick = this.tick.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
  }

  updateStopwatchState(updatedStopwatch) {
    const targetIndex = this.state.stopwatches.findIndex((s) => s.id === updatedStopwatch.id);

    this.setState({
      stopwatches: [
        ...this.state.stopwatches.slice(0, targetIndex),
        updatedStopwatch,
        ...this.state.stopwatches.slice(targetIndex + 1, this.state.stopwatches.length)
      ]
    });
  }

  tick(stopwatchId) {
    const stopwatch = this.state.stopwatches.find((s) => s.id === stopwatchId);
    const updatedStopwatch = {
      ...stopwatch,
      elapsedTime: stopwatch.elapsedTime += this.interval
    };

    this.updateStopwatchState(updatedStopwatch);
  }

  toggleStopwatch(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      isPaused: !stopwatch.isPaused
    };

    if (updatedStopwatch.isPaused) {
      clearInterval(updatedStopwatch.timeoutId);
    } else {
      updatedStopwatch.timeoutId = setInterval(this.tick, this.interval, stopwatch.id);
    }

    this.updateStopwatchState(updatedStopwatch);
  }

  render() {
    return (
      <div className="app-container">
        <div className="app-body">
          {this.state.stopwatches.map(stopwatch => (
            <Stopwatch key={stopwatch.id} stopwatch={stopwatch} onToggle={this.toggleStopwatch}/>))}
        </div>
        <footer className="app-footer">
          <button type="button" className="button-primary">Add</button>
        </footer>
      </div>
    );
  }
}
