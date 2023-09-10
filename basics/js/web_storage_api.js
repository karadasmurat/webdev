// localStorage.colorSetting = "#a4509b";
// localStorage["colorSetting"] = "#a4509b";
// localStorage.setItem("colorSetting", "#a4509b");

// The localStorage read-only property of the window interface
// allows you to access a Storage object for the Document's origin;
// the stored data is saved across browser sessions.

function saveWizards() {
  const wizards = [
    {
      lastName: "Potter",
      age: 17,
      isWizard: true,
      house: "Gryffindor",
      wand: {
        wood: "Holly",
        core: "Phoenix feather",
        length: 11.5,
      },
      courses: ["Potions", "Transfiguration", "Defense Against the Dark Arts"],
    },
    {
      lastName: "Malfoy",
      age: 17,
      isWizard: true,
      house: "Slytherin",
      wand: {
        wood: "Hawthorn",
        core: "Veela hair",
        length: 10.0,
      },
      courses: ["Dark Arts", "Divination", "Muggle Studies"],
    },
  ];

  localStorage.setItem("wizards", JSON.stringify(wizards));
}

function showStoreInfo() {
  const storeDiv = document.getElementById("store");

  // Note that getItem() returns a string containing the value of the key
  const wizards = localStorage.getItem("wizards");
  if (wizards) {
    const wizs = JSON.parse(wizards);
    for (let w of wizs) {
      storeDiv.innerHTML +=
        "<br/>" +
        w.lastName +
        ", " +
        w.age +
        ": " +
        typeof w.age +
        ", " +
        w.isWizard +
        ": " +
        typeof w.isWizard;
    }
  }

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
  const isWizard = true;

  localStorage.setItem("student", JSON.stringify({ name, house, isWizard }));

  showStoreInfo();
});

saveWizards();
showStoreInfo();
