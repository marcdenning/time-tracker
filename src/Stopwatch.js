import './Stopwatch.css';
import formatDuration from './formatDuration';

export default function Stopwatch(props) {
  const {stopwatch, onToggle, onSelect} = props;

  return (
    <div className={'stopwatch-wrapper'}>
      <span className={'stopwatch-selector'}>
        <input type="checkbox" checked={stopwatch.isSelected}
               onChange={(e) => onSelect(e, stopwatch)}/>
      </span>
      <span className={'stopwatch-duration'}>{formatDuration(stopwatch.elapsedTime)}</span>
      <span className={'stopwatch-label'}>{stopwatch.label}</span>
      <span className={'stopwatch-toggle-button-wrapper'}>
        <button type="button"
                onClick={(e) => onToggle(e, stopwatch)}>{stopwatch.isPaused ? 'Resume' : 'Pause'}
        </button>
      </span>
    </div>
  );
};
