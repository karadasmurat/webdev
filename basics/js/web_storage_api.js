localStorage.colorSetting = "#a4509b";
localStorage["colorSetting"] = "#a4509b";
localStorage.setItem("colorSetting", "#a4509b");

function showStoreInfo() {
  const storeDiv = document.getElementById("store");
  const val = localStorage.getItem("luckynumber");
  console.log(val);
  if (val) {
    storeDiv.innerHTML = val;
  }
}

const btn_luckynumber = document.getElementById("btn_luckynumber");
btn_luckynumber.addEventListener("click", () => {
  const val = document.getElementById("luckynumber").value;
  console.log("click!", val);
  localStorage.setItem("luckynumber", val);

  showStoreInfo();
});

showStoreInfo();
