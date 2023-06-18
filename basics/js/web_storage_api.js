localStorage.colorSetting = "#a4509b";
localStorage["colorSetting"] = "#a4509b";
localStorage.setItem("colorSetting", "#a4509b");

function saveStudents() {
  const students = [
    { name: "Potter", house: "Gryffindoor" },
    { name: "Weasley", house: "Gryffindoor" },
    { name: "Hermione", house: "Gryffindoor" },
    { name: "Draco", house: "Slytherin" },
  ];

  localStorage.setItem("students", JSON.stringify(students));
}

function showStoreInfo() {
  const storeDiv = document.getElementById("store");
  const val = localStorage.getItem("luckynumber");
  console.log(val);
  if (val) {
    storeDiv.innerHTML = val;
  }

  const std = localStorage.getItem("student");
  if (std) {
    const student = JSON.parse(std);
    storeDiv.innerHTML += "<br/>" + student.name + ", " + student.house;
  }
}

const btn_luckynumber = document.getElementById("btn_luckynumber");
btn_luckynumber.addEventListener("click", () => {
  const val = document.getElementById("luckynumber").value;
  console.log("click!", val);
  localStorage.setItem("luckynumber", val);

  showStoreInfo();
});

const btn_obj = document.getElementById("btn_obj");
btn_obj.addEventListener("click", () => {
  const name = document.getElementById("name").value;
  const house = document.getElementById("house").value;

  localStorage.setItem("student", JSON.stringify({ name, house }));

  showStoreInfo();
});

saveStudents();
showStoreInfo();
