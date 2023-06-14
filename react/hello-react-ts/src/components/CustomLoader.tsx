type CustomLoaderProps = {
  label?: string;
};
export default function CustomLoader({ label = "Loading" }: CustomLoaderProps) {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="custom-loader"></div>
      <span>{label}</span>
    </div>
  );
}
