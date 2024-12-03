export { Instruction };

function Instruction({ onClick }) {
  return (
    <div className="instruction">
      <h1>How to Play</h1>
      <p>
        Select a new pokemon each time. The cards will shuffle after each click.
        You lose if you click on a pokemon that you have already selected. You
        win if you can click on all pokemon!
      </p>
      <button type="button" onClick={onClick}>
        Close
      </button>
    </div>
  );
}
