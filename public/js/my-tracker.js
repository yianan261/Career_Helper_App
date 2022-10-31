// So Man Amanda Au-Yeung
function Tracker() {
  const tracker = {};

  const updatesDiv = document.querySelector("div#updates");
  let form = document.getElementById("tracker-form");

  function renderAdded(updates) {
    updatesDiv.innerHTML = "";
    console.log("render added", updates);
    for (let objects of updates["companies"]) {
      console.log("object, object id", objects, objects._id);
      let u = objects.tracker;
      let uDiv = document.createElement("div");
      // let uEdit = document.createElement("button");
      // uEdit.type = "button";
      // uEdit.className = "editButton";
      // const uDel = document.createElement("button");
      // uDel.type = "submit";
      uDiv.className = "container-text-center";
      uDiv.innerHTML = `
      <form id=${objects._id}>
        <div class="row row-cols-6">
        <div class="col">
        <button id="editBtn">Edit</button>
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
        </form>
        `;
      // uEdit.innerHTML = "Edit";
      // uDel.innerHTML = "Delete";
      // updatesDiv.appendChild(uEdit);
      // uDiv.appendChild(uDel);
      updatesDiv.appendChild(uDiv);
      uDiv.querySelector("#editBtn").addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log("edit tracker is clicked");
        editTracker(u, objects._id);
        // updateTracker();
      });
    }
  }

  function getTracker() {
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log("getTracker frontend form: ", form);
        createTracker(form);
        form = document.getElementById("tracker-form");
      });
    }
  }

  async function createTracker(form) {
    console.log("create tracker", form);
    try {
      await fetch("./tracker", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      getAllTracker();
      // let editButton = document.getElementsByClassName("editButton");
      // editButton.addEventListener("click", (evt) => {
      //   console.log("edit button is clicked");
      //   evt.preventDefault();
      // });
    } catch (err) {
      alert(`There is an error in createTracker ${err}`);
    }
  }

  async function getAllTracker() {
    console.log("get tracker");
    try {
      const res = await fetch("./tracker/get-tracker", {
        method: "GET",
      });
      const data = await res.json();
      console.log("data frontend get: ", data);
      renderAdded(data);
    } catch (err) {
      alert(`There is an error getAllTracker ${err}`);
    }
  }

  function editTracker(u, id) {
    let tracker = document.getElementById(id);
    tracker.innerHTML = `
      <div class="row row-cols-6">
      <div class="col">
        <button id="editSubmit">Update</button>
        </div>
        <div class="col">
        <label><input placeholder=${u.company}></input></label>
        </div>
        <div class="col">
        <label><input placeholder=${u.position}></input></label>
        </div>
        <div class="col">
        <label><input placeholder=${u.appLink}></input></label>
        </div>
        <div class="col">
        <label><input type="date" id="new-input" name="openDate"></label>
        </div>
        <div class="col">
        <label><select id="status" name="status">
        <option value="Saved">Not Applied</option>
        <option value="Applied">Applied</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Reject">Reject</option>
        <option value="Withdraw">Withdraw</option>
    </select></label>
        </div>
      </div>
      `;
    // let editSubmitId = tracker.querySelector("#editSubmit");
    // feedUpdateTracker(editSubmitId);
    // tracker.querySelector("#editSubmit").addEventListener("click", (evt) => {
    //   evt.preventDefault();
    //   updateTracker();
    // });
  }

  // function feedUpdateTracker(editId) {
  //   editId.addEventListener("submit", (evt) => {
  //     evt.preventDefault();
  //     updateTracker();
  //   });
  // }

  // edit tracker and updates
  async function updateTracker() {
    try {
      await fetch("./tracker/updated-tracker", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      getAllTracker();
    } catch (err) {
      alert(`There is an error updateTracker ${err}`);
    }
  }

  updateTracker();
  getAllTracker();
  getTracker();
  return tracker;
}

Tracker();
