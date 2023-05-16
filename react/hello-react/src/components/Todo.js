import { useState } from "react";

export function TodoItem({id, title, isdone}){

    const styleDone = {color: "teal"};
    const styleNotDone = {color: "pink"};

    const [status, setStatus] = useState(isdone);

    function handleClick(){
        // toggle state
        setStatus(!status);
    }

    return (

        <div className="dflex-col">
            <h1 style={ status ? styleDone : styleNotDone }>{title}</h1>
            <button onClick={handleClick}>Change status</button>
        </div>

    );

}

export default function TodoList({items}){

    // accept as a parameter
    // const todos = [
    //     {id:1 , title:"Todo #1", isdone:true},
    //     {id:2 , title:"Todo #2", isdone:false},
    //     {id:3 , title:"Todo #3", isdone:true}
    // ];

    return(
        <div>
            {items.map(todo => <TodoItem key={todo.id} title={todo.title} isdone={todo.isdone} />)}
        </div>
    );

}