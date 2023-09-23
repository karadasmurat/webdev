import { NamedGreeter } from "../components/Greeter";

export function simpleHOC(WrappedComponent, newProp) {
  return (props) => {
    return (
      <>
        <h1>{newProp}</h1>
        <WrappedComponent {...props} />
      </>
    );
  };
}

const EnhancedGreeter = simpleHOC(NamedGreeter, "enhanced!");

export default EnhancedGreeter;
