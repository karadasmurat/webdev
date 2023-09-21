export default function PropsPrinter(props) {
  let properties = [];
  // traverse through props object, and construct JSX.
  for (const key of Object.keys(props)) {
    // console.log(key, props[key]);
    properties.push(
      <li>
        {key}:{typeof props[key]} = {props[key]}
      </li>
    );
  }

  return <ul>{properties}</ul>;
}
