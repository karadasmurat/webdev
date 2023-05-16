function Car(props) {
  return <h2>I am a { props.brand }!</h2>;
}

function Bike( { make } ) {
  return <h2>This is {make}. Tighten your helmet straps!</h2>;
}

function Garage(props) {

    const carName = "Kia (local var)";
    const bikeType = "Cross (local var)";

  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car brand="Ford (String literal)" />
      <Car brand={ carName } />
      <Car brand={ props.make } />
      <Bike make={ bikeType } />
    </> 
  );
}

export default Garage;