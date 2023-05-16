import { useState } from 'react';
import '../assets/styles/styles.css'

export function SlotItem({item}){

    return (
        <div className='SlotItem'>
            <p>{item}</p>
        </div>
    );
}

export default function Slot(){

    const visuals = ['🐶', '🦊', '🐵', '🦋'];

    const getRandomVisual = () => {
        return visuals[getRandomIndex()];
    }

    const getRandomIndex = () => {
        return Math.floor(Math.random() * visuals.length)
    }

    const [items, setItems] = useState([getRandomVisual(), getRandomVisual(), getRandomVisual()]);


    function handleClick(){
        // set new random items
        // update state to trigger re-render
        setItems([getRandomVisual(), getRandomVisual(), getRandomVisual()]);
    }

    const isAWin = () => items[0] === items[1] && items[0] === items[2];


    return (
        <div className='dflex-col bordered'>
        <div className='dflex-row'>
            <SlotItem item={items[0]} />
            <SlotItem item={items[1]}/>
            <SlotItem item={items[2]}/>
        </div>
        <div className='d-flex column'>
            <button onClick={handleClick}>Roll</button>
            <p>{isAWin() ? 'You win!': 'You loose!'}</p>
        </div>
        </div>
    );
}