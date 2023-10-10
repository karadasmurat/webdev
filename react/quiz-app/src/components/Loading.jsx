export default function Loading({ text = "Loading" }) {
  return (
    <div className="spinner-border" role="status">
      <span className="visually-hidden">{text}...</span>
    </div>
  );
}
