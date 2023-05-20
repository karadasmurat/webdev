let x = " #";
let y = "# ";

let size=4;
let row="";
for(let i=0; i<size; i++){
    let first = i%2==0 ? true : false ;
    for(let j=0; j<size/2; j++){
        if(first){
            row += y;
        }else{
            row += x;
        }
    }
    console.log(row);
    row = "";
    //row.length=0;
}