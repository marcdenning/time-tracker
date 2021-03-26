import Stopwatch from './Stopwatch';

export default function StopwatchContainer({interval, stopwatches, setStopwatches}) {
  return (
    <div className="app-container">
      <div className="app-body">
        {stopwatches.map(stopwatch => (
          <Stopwatch key={stopwatch.id} stopwatch={stopwatch} onToggle={toggleStopwatch} onSelect={selectStopwatch}
                     onLabelChange={updateStopwatchLabel}/>))}
      </div>
      <footer className="app-footer">
        <button type="button" className={'button-primary'}
                onClick={containerAction}>{getContainerButtonText(stopwatches)}</button>
      </footer>
    </div>
  );

  function addStopwatch() {
    setStopwatches((stopwatches) => [
      ...stopwatches,
      {
        id: Math.max(...stopwatches.map((s) => s.id)) + 1,
        elapsedTime: 0,
        label: 'Stopwatch',
        isPaused: true,
        isSelected: false,
        timeoutId: null
      }
    ]);
  }

  function containerAction() {
    const selectedStopwatches = stopwatches.filter((s) => s.isSelected);

    if (selectedStopwatches.length === 0) {
      addStopwatch();
    } else {
      deleteStopwatches(selectedStopwatches);
    }
  }

  function deleteStopwatches(selectedStopwatches) {
    setStopwatches((stopwatches) => {
      const stopwatchIds = selectedStopwatches.map((s) => s.id);

      for (const stopwatch of stopwatches.filter((s) => stopwatchIds.indexOf(s.id) !== -1)) {
        if (stopwatch.timeoutId !== null) {
          clearInterval(stopwatch.timeoutId);
        }
      }

      return [
        ...stopwatches.filter((s) => stopwatchIds.indexOf(s.id) === -1)
      ];
    });
  }

  function selectStopwatch(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      isSelected: !stopwatch.isSelected
    };

    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function tick(stopwatchId) {
    setStopwatches((stopwatches) => {
      const stopwatch = stopwatches.find((s) => s.id === stopwatchId);
      const updatedStopwatch = {
        ...stopwatch,
        elapsedTime: stopwatch.elapsedTime += interval
      };

      return updateStopwatchState(updatedStopwatch)(stopwatches);
    });
  }

  function toggleStopwatch(event, stopwatch) {
    const updatedStopwatch = {
      ...stopwatch,
      isPaused: !stopwatch.isPaused
    };

    if (updatedStopwatch.isPaused) {
      clearInterval(updatedStopwatch.timeoutId);
    } else {
      updatedStopwatch.timeoutId = setInterval(tick, interval, stopwatch.id);
    }

    setStopwatches(updateStopwatchState(updatedStopwatch));
  }

  function updateStopwatchLabel(event, stopwatch) {
    setStopwatches(updateStopwatchState({
      ...stopwatch,
      label: event.target.value
    }));
  }

  function updateStopwatchState(updatedStopwatch) {
    return (stopwatches) => {
      const targetIndex = stopwatches.findIndex((s) => s.id === updatedStopwatch.id);

      return [
        ...stopwatches.slice(0, targetIndex),
        updatedStopwatch,
        ...stopwatches.slice(targetIndex + 1, stopwatches.length)
      ]
    };
  }
};

function getContainerButtonText(stopwatches) {
  if (stopwatches.findIndex((s) => s.isSelected) === -1) {
    return 'Add';
  }
  return 'Delete';
}