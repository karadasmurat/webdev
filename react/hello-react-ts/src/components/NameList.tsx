// NameList.js

const Name = ({ name }: { name: string }) => {
  return (
    <div>
      <p>Name: {name}</p>
    </div>
  );
};

const NameList = ({ names }: { names: string[] }) => {
  return (
    <>
      <h2>Names:</h2>
      <ul>
        {names.map((name) => (
          <li key={name}>
            {/* NameList component */}
            <Name name={name} /> /
          </li>
        ))}
      </ul>
    </>
  );
};

export default NameList;
export { Name };
