export { Message };

function Message({ header, text, onClick }) {
  return (
    <div className="message">
      <h1>{header}</h1>
      <p>{text}</p>
      <button type="button" onClick={onClick}>
        Play again
      </button>
    </div>
  );
}
