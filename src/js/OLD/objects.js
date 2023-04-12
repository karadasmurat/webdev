const student = {
    name: "MK",
    greet: function(){
        console.log(`Hi, this is ` + this.name);
    }
}

student.greet();