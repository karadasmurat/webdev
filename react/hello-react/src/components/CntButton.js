import { useState } from 'react';

function CntButton(){

    // state decleration, using hook
    const [cnt, setCnt] = useState(0);

    function handleClick(){
        // update state using hook
        setCnt(cnt + 1);
    }

    return (
        <button onClick={handleClick}>
            Clicked {cnt} times
        </button>);
}


export default CntButton;