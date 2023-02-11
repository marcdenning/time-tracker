export default function About() {
  return (
    <div>
      <h2>Background</h2>
      <p>This time tracker is intended to help track time spent on multiple projects or tasks at one time.
        I am using to help myself keep track of tasks at work, and to exercise my front-end development skills a bit.</p>

      <p>I plan to publish updates to the app over time as I expand on its features.
        I expect to only build features that I am going to use and aim to keep this simple.
        That said, if you have ideas or want to use this for yourself, feel free to submit a GitHub issue or pull request.</p>

      <h2>Instructions</h2>

      <ul>
        <li>Use the add button to add another stopwatch to track another task.</li>
        <li>Individual stopwatches can be started and stopped in parallel.</li>
        <li>Select a stopwatch with the checkbox to delete it.</li>
        <li>Multiple stopwatches may be deleted simultaneously.</li>
        <li>Use the reset button to set all stopwatches to zero.</li>
        <li>The elapsed time on a stopwatch may be modified <em>only</em> when the stopwatch is paused.</li>
      </ul>

      <a href="https://www.iubenda.com/privacy-policy/73184110/legal" className="iubenda-white iubenda-embed"
         title="Privacy Policy" target="_blank" rel="noreferrer">Privacy Policy</a>
    </div>
  );
}
