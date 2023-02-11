import './Stopwatch.css';
import formatDuration from './formatDuration';

export default function Stopwatch({stopwatch, onToggle, onSelect, onDurationChange, onDurationBlur, onLabelChange}) {
  return (
    <div className={'stopwatch-wrapper'}>
      <span className={'stopwatch-selector'}>
        <input type="checkbox" checked={stopwatch.isSelected}
               onChange={(e) => onSelect(e, stopwatch)}/>
      </span>
      <span className={'stopwatch-duration'}>
        <input type="text" value={stopwatch.durationInputString || formatDuration(stopwatch.displayTime)}
               disabled={!stopwatch.isPaused}
               onChange={(e) => onDurationChange(e, stopwatch)}
               onBlur={(e) => onDurationBlur(e, stopwatch)}/>
      </span>
      <span className={'stopwatch-label'}>
        <input type={'text'} value={stopwatch.label}
               onChange={(e) => onLabelChange(e, stopwatch)}/>
      </span>
      <span className={'stopwatch-toggle-button-wrapper'}>
        <button type="button"
                onClick={(e) => onToggle(e, stopwatch)}>
          {stopwatch.isPaused ? 'Resume' : 'Pause'}
        </button>
      </span>
    </div>
  );
};
