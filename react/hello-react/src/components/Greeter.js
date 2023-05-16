export default function Greeter(){
    return (<h1>Hi!</h1>);
}

//using props
export function NamedGreeter({name, location}){
    return (<h1>Hello, {name}, from {location}!</h1>);
}



