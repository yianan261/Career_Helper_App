// So Man Amanda Au-Yeung
function Index() {
  const index = {};

  const updatesDiv = document.querySelector("div#updates");

  function renderUpdates(updates) {
    updatesDiv.innerHTML = "";
    console.log("render updates", updates);
    for (let u of updates) {
      const uDiv = document.createElement("div");
      uDiv.className = "container-text-center";
      uDiv.innerHTML = `
        <div class="row row-cols-6">
        <div class="col">
        <label>✓</label>
        </div>
        <div class="col">
        <label><output>${u.company}</output></label>
        </div>
        <div class="col">
        <label><output>${u.position}</output></label>
        </div>
        <div class="col">
        <label><output>${u.appLink}</output></label>
        </div>
        <div class="col">
        <label><output>${u.openDate}</output></label>
        </div>
        <div class="col">
        <label><output>${u.status}</output></label>
        </div>
    </div>
        `;

      updatesDiv.appendChild(uDiv);
    }
  }

  function getTracker() {
    const form = document.getElementById("tracker-form");
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("getTracker frontend form: ", form);
        createTracker(form);
      });
    }
  }

  async function createTracker(form) {
    try {
      const res = await fetch("./tracker", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      console.log("fetch createTracker test -- res: ", res);
      const user_data = await res.json();
      console.log("check user_data.new_company: ", user_data.new_company);
      renderUpdates(user_data.new_company);
      getAllTracker();
    } catch (err) {
      alert(`There is an error ${err}`);
    }
  }

  async function getAllTracker(form) {
    var responseClone;
    await fetch("./tracker", {
      method: "GET",
      body: new URLSearchParams(new FormData(form)),
    })
      .then((response) => {
        console.log(response);
        responseClone = response.clone();
        response.json();
      })
      .then(
        (data) => {
          renderUpdates(data.result);
        },
        function (rejectionReason) {
          console.log(
            "Error parsing JSON from response: ",
            rejectionReason,
            responseClone
          );
        }
      );
  }

  // async function getAllTracker() {
  //   var responseClone;
  //   await fetch("./tracker")
  //     .then((response) => {
  //       responseClone = response.clone();
  //       response.json();
  //     }
  //     )
  //     .then((data) => {
  //       renderUpdates(data.result);
  //     }, function (rejectionReason){
  //       console.log("Error parsing JSON from response: ", rejectionReason, responseClone);
  //     });
  // }

  getAllTracker();
  getTracker();
  return index;
}

Index();
