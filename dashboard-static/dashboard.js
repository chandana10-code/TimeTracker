fetch("http://localhost:5000/api/activity")
  .then(res => res.json())
  .then(data => {
    let productive = 0, unproductive = 0;

    data.forEach(d => {
      if (d.category === "Productive") productive += d.timeSpent;
      else if (d.category === "Unproductive") unproductive += d.timeSpent;
    });

    new Chart(document.getElementById("chart"), {
      type: "pie",
      data: {
        labels: ["Productive", "Unproductive"],
        datasets: [{
          data: [productive, unproductive]
        }]
      }
    });
  });
