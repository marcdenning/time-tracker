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
    this.addStopwatch = this.addStopwatch.bind(this);
    this.deleteStopwatches = this.deleteStopwatches.bind(this);
    this.containerAction = this.containerAction.bind(this);
    this.selectStopwatch = this.selectStopwatch.bind(this);
    this.tick = this.tick.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.updateStopwatchLabel = this.updateStopwatchLabel.bind(this);
    this.updateStopwatchState = this.updateStopwatchState.bind(this);
  }

  addStopwatch() {
    this.setState({
      stopwatches: [
        ...this.state.stopwatches,
        {
          id: Math.max(...this.state.stopwatches.map((s) => s.id)) + 1,
          elapsedTime: 0,
          label: 'Stopwatch',
          isPaused: true,
          isSelected: false,
          timeoutId: null
        }
      ]
    });
  }

  containerAction() {
    const selectedStopwatches = this.state.stopwatches.filter((s) => s.isSelected);

    if (selectedStopwatches.length === 0) {
      this.addStopwatch();
    } else {
      this.deleteStopwatches(selectedStopwatches);
    }
  }

  deleteStopwatches(stopwatches) {
    const stopwatchIds = stopwatches.map((s) => s.id);

    for (const stopwatch of stopwatches) {
      if (stopwatch.timeoutId !== null) {
        clearInterval(stopwatch.timeoutId);
      }
    }

    this.setState({
      stopwatches: [
        ...this.state.stopwatches.filter((s) => stopwatchIds.indexOf(s.id) === -1)
      ]
    });
  }

  getContainerButtonText(stopwatches) {
    if (stopwatches.findIndex((s) => s.isSelected) === -1) {
      return 'Add';
    }
    return 'Delete';
  }

  selectStopwatch(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      isSelected: !stopwatch.isSelected
    };

    this.updateStopwatchState(updatedStopwatch);
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

  updateStopwatchLabel(event, stopwatch) {
    this.updateStopwatchState({
      ...stopwatch,
      label: event.target.value
    });
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

  render() {
    return (
      <div className="app-container">
        <div className="app-body">
          {this.state.stopwatches.map(stopwatch => (
            <Stopwatch key={stopwatch.id} stopwatch={stopwatch} onToggle={this.toggleStopwatch} onSelect={this.selectStopwatch} onLabelChange={this.updateStopwatchLabel}/>))}
        </div>
        <footer className="app-footer">
          <button type="button" className={'button-primary'} onClick={this.containerAction}>{this.getContainerButtonText(this.state.stopwatches)}</button>
        </footer>
      </div>
    );
  }
}
