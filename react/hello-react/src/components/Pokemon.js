import '../assets/styles/styles.css'

export default function Pokemon(){

    const getImgURL = () => {
        const pokeNo = Math.floor(Math.random() * 150) + 1;
        const imgURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNo}.png`;
        
        return {pokeNo, imgURL}
    }

    const {pokeNo, imgURL} = getImgURL();
    
    return (
        <div className='Pokemon'>
            <h1>Pokemon #{pokeNo}</h1>
            <img src={ imgURL } alt={ "Pokemon " + pokeNo } />
        </div>
    );
}