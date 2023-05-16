import { useState } from 'react';
import '../assets/styles/styles.css'

export function ColorBox({bgcolor}){

    const colors = ["red", "orange", "yellow", "green", "blue", "purple", "coral", "teal", "olive", "navy", "deeppink", "indigo", "limegreen", "slateblue", "slategray"];

    // note, useState init function without paranthesis
    const [_bgcolor, setBgColor] = useState(getRandomColor);

    function getRandomColor(){
        // get a random color and update state
        const randIndex = Math.floor(Math.random() * colors.length);
        // console.log(randIndex);

        return colors[randIndex];
    }

    function handleClick(){
        // update state
        setBgColor(getRandomColor());
    }

    return (
        <div className="ColorBox" style={{backgroundColor: _bgcolor}} onClick={handleClick}></div>
    );
}

export default function ColorGrid({boxCnt}){

    return (
        <div className='dflex-row' style={{width:"260px"}}>
            { Array(boxCnt).fill(null).map( _ => <ColorBox />)}
        </div>
    );
}