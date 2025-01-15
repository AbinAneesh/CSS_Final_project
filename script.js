async function fetchCovidData() {
  const statsElement = document.getElementById("stats");
  try {
    const response = await fetch("https://disease.sh/v3/covid-19/all");
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();

    // Update the dashboard with fetched data
    document.getElementById("cases").querySelector("h2").textContent = data.cases.toLocaleString();
    document.getElementById("deaths").querySelector("h2").textContent = data.deaths.toLocaleString();
    document.getElementById("recovered").querySelector("h2").textContent = data.recovered.toLocaleString();

    // Render the charts
    renderBarChart(data);
    renderPieChart(data);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    statsElement.innerHTML = "<p>Unable to load data at this time.</p>";
  }
}

window.onload = fetchCovidData;

function renderBarChart(data) {
  const ctx = document.getElementById("covidChart").getContext("2d");

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ["Cases", "Deaths", "Recovered"],
      datasets: [{
        label: 'COVID-19 Stats',
        data: [data.cases, data.deaths, data.recovered],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function renderPieChart(data) {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ["Cases", "Deaths", "Recovered"],
      datasets: [{
        label: 'COVID-19 Distribution',
        data: [data.cases, data.deaths, data.recovered],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });
}

/*function renderPieChart(data) {
  const ctx = document.getElementById("myChart02").getContext("2d");

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Cases", "Deaths", "Recovered"],
      datasets: [{
        label: 'COVID-19 Distribution',
        data: [data.cases, data.deaths, data.recovered],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    }
  });
}
*/