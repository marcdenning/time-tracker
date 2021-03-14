import formatDuration from './formatDuration';

export default function Stopwatch(props) {
  const {stopwatch, onToggle} = props;

  return (
    <div>
      <span><input type="checkbox" checked={stopwatch.isSelected}/></span>
      <span>{formatDuration(stopwatch.elapsedTime)}</span>
      <span>{stopwatch.label}</span>
      <span>
        <button type="button"
                onClick={(e) => onToggle(e, stopwatch)}>{stopwatch.isPaused ? 'Resume' : 'Pause'}
        </button>
      </span>
    </div>
  );
}
