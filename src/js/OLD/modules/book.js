export default class Book {

    constructor(title, genre){
        this.title = title;
        this.genre = genre;
    }

    printName(){
        console.log(`The title of the book is ${this.title}. Its a ${this.genre}`)
    }
}