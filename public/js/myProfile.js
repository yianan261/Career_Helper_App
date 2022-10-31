function MyProfile() {
  //Yian Chen
  //renders profile
  const renderProfile = (data) => {
    const greetUser = document.getElementById("greetUser");
    greetUser.innerHTML = `Hello ${data.name}`;
  };

  //Yian Chen
  //check the login user in session
  const userInSession = async () => {
    try {
      const res = await fetch("./profile/user/edit-profile");
      const profileData = await res.json();
      if (profileData.data) {
        console.log("profileData.data", profileData.data);
        renderProfile(profileData.data);
      }
    } catch (err) {
      alert(`There is an error ${err}`);
      console.error(err);
    }
  };

  userInSession();
}

// Amanda Au-Yeung
// render Charts
// Load the Visualization API and the corechart package.
// eslint-disable-next-line no-undef
google.charts.load("current", { packages: ["corechart"] });

// Set a callback to run when the Google Visualization API is loaded.
// eslint-disable-next-line no-undef
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
async function drawChart() {
  let trackerCount = await getAllTracker();
  console.log("draw Chart", trackerCount);
  // Create the data table.
  // eslint-disable-next-line no-undef
  let data = new google.visualization.DataTable();
  data.addColumn("string", "Status");
  data.addColumn("number", "Applications");
  for (let [status, count] of trackerCount) {
    data.addRows([[status, count]]);
  }

  // Set chart options
  var options = {
    title: "Application Status",
    width: 300,
    height: 300,
  };

  // Instantiate and draw our chart, passing in some options.
  // eslint-disable-next-line no-undef
  var chart = new google.visualization.ColumnChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}

function renderApplications(data) {
  const dataCount = new Map();
  for (let objects of data["companies"]) {
    let u = objects.tracker;
    if (!dataCount.has(u.status)) {
      dataCount.set(u.status, 1);
    } else {
      dataCount.set(u.status, dataCount.get(u.status) + 1);
    }
  }
  console.log(dataCount);
  return dataCount;
}

async function getAllTracker() {
  try {
    const res = await fetch("./tracker/get-tracker", {
      method: "GET",
    });
    const data = await res.json();
    return renderApplications(data);
  } catch (err) {
    alert(`There is an error getAllTracker ${err}`);
  }
}

getAllTracker();
MyProfile();
