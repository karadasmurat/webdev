/**
 * MyButton renders a <button> element with the class "btn btn-primary"
 * children: This is a special prop in React that represents the content placed between the opening and closing tags of the component.
 * ...rest : This is a destructuring assignment that collects all the remaining props passed to the MyButton component into an object called rest.
 */
const MyButton = ({ children, ...rest }) => {
  return (
    <button className="btn btn-primary" {...rest}>
      {children}
    </button>
  );
};

const MyHeader = ({ children, ...rest }) => {
  return <h1 {...rest}>{children}</h1>;
};

// A higher-order component (HOC) that enhances a given component by adding a `onMouseOver` event handler.
const withMouseOver = (Component) => {
  const handleMouseOver = () => {
    console.log("Mouse over.");
  };

  // returns the definition of react component,
  // which is an enhanced version of the input Component with the `onMouseOver` event handler added.
  return (props) => {
    return <Component {...props} onMouseOver={handleMouseOver}></Component>;
  };
};

// Now, EnhancedButton has the onMouseOver event handler added to it:
const EnhancedButton = withMouseOver(MyButton);
const EnhancedHeader = withMouseOver(MyHeader);

export { MyButton, MyHeader, EnhancedButton, EnhancedHeader };



