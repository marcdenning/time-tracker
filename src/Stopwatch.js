export default function Stopwatch(props) {
  const stopwatch = props.stopwatch;

  return (
    <div>
      <span><input type="checkbox" checked={stopwatch.isSelected}/></span>
      <span>{stopwatch.elapsedTime}</span>
      <span>{stopwatch.label}</span>
      <span><button type="button">{stopwatch.isPaused ? 'Resume' : 'Pause'}</button></span>
    </div>
  )
}
