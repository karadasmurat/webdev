const Name = ({ name }) => {
  return (
    <div>
      <p>Name: {name}</p>
    </div>
  );
};

const NameList = ({ names }) => {
  return (
    <>
      <h2>Names:</h2>
      <ul>
        {names.map(name => (
          <li key={name}>
            <Name name={name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default NameList;
export{Name};