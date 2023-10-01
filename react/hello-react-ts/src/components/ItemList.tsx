import { FaTrash } from "react-icons/fa";

export default function ItemListDemo() {
  return <ItemList />;
}

type ItemProps = {
  title: string;
  desc: string;
  onDelete: () => void;
};

export function Item({ title, desc, onDelete }: ItemProps) {
  return (
    <div className="card m-2" style={{ minWidth: "14rem" }}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {/* truncate the text with an ellipsis. */}
        <p className="card-text text-truncate">{desc}</p>
        {/* delegate click handling to callback, which is provided as props 
         Parent already knows id, no need to make it a parameter we send to parent. */}
        <button className="btn btn-danger" onClick={onDelete}>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export function ItemList() {
  const items = [
    { id: 1, title: "Item 1", desc: "This is the first item." },
    { id: 2, title: "Item 2", desc: "This is the second item." },
    { id: 3, title: "Item 3", desc: "This is the third item." },
    { id: 4, title: "Item 4", desc: "This is the 4th item." },
  ];

  function handleDelete(id: number) {
    console.log("Delete Item with id:", id);
  }
  return items.length > 0 ? (
    // horizontal scrollable
    <div className="d-flex flex-row flex-nowrap overflow-auto">
      {items.map((item) => (
        <Item
          key={item.id}
          // v1 - selectively send object properties as component props
          // key={item.title}
          // title={item.title}
          // desc={item.desc}

          // v2- use object destructuring to send all model object properties as component props
          {...item}
          // As the parent, we already know Item id,
          // no need to make it a parameter child component Item sends to parent.
          onDelete={() => {
            handleDelete(item.id);
          }}
        />
      ))}
    </div>
  ) : (
    <p>No items found.</p>
  );
}

// export default function ItemDetails({ item, onDelete }: ItemDetailsProps) {
//   return (
//     <>
//       <ul>
//         <li className="list-group-item">
//           <code>Title:</code>
//           {item?.completed ? <BsCheck2Circle /> : <BsCalendar />} {item?.title}
//         </li>
//         <li className="list-group-item">
//           <code>id:</code> {item?._id}
//         </li>
//       </ul>

//       {/* delegate click handling to callback, which is provided as props */}
//       <button onClick={() => onDelete(item)}>Delete</button>
//     </>
//   );
// }
