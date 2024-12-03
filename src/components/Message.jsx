export { Message };

function Message({ outcome, header, text, onClick }) {
  return (
    <div className={`message ${outcome}`}>
      <h1>{header}</h1>
      <p>{text}</p>
      <button type="button" onClick={onClick}>
        Play again
      </button>
    </div>
  );
}
