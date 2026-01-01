chrome.storage.local.get(["activity"], (data) => {
  const list = document.getElementById("list");
  const activity = data.activity || {};
  for (let site in activity) {
    const li = document.createElement("li");
    li.textContent = `${site} : ${(activity[site] / 60000).toFixed(2)} mins`;
    list.appendChild(li);
  }
});
