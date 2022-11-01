// So Man Amanda Au-Yeung
function Tracker() {
  const tracker = {};

  const updatesDiv = document.querySelector("div#updates");
  let form = document.getElementById("tracker-form");

  function renderAdded(updates) {
    updatesDiv.innerHTML = "";
    for (let objects of updates["companies"]) {
      let u = objects.tracker;
      let uDiv = document.createElement("div");
      uDiv.className = "container-text-center";
      uDiv.innerHTML = `
      <form id=${objects._id}>
        <div class="row row-cols-6">
          <div class="col">
          <button id="editBtn"><i style='font-size:24px' class='far'>&#xf044;</i></button>
          <button id="delBtn"><i style='font-size:24px' class='fas'>&#xf2ed;</i></button>
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
      updatesDiv.appendChild(uDiv);
      uDiv.querySelector("#editBtn").addEventListener("click", (evt) => {
        evt.preventDefault();
        editTracker(u, objects._id);
      });
      uDiv.querySelector("#delBtn").addEventListener("click", (evt) => {
        evt.preventDefault();
        updatesDiv.removeChild(uDiv);
        deleteTracker(objects._id);
      });
    }
  }

  function getTracker() {
    if (form) {
      form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        createTracker(form);
        document.getElementById("tracker-form").reset();
      });
    }
  }

  async function createTracker(_form) {
    try {
      await fetch("./tracker", {
        method: "POST",
        body: new URLSearchParams(new FormData(_form)),
      });
      getAllTracker();
    } catch (err) {
      alert(`There is an error in createTracker ${err}`);
    }
  }

  async function getAllTracker() {
    try {
      const res = await fetch("./tracker/get-tracker", {
        method: "GET",
      });
      const data = await res.json();
      renderAdded(data);
    } catch (err) {
      alert(`There is an error getAllTracker ${err}`);
    }
  }

  function editTracker(u, id) {
    let tracker = document.getElementById(id);
    tracker.innerHTML = `
    <form id=${id}>
      <div class="row row-cols-6">
      <div class="col">
        <button type="submit" id="editSubmit">Update</button>
        </div>
        <div class="col">
        <label><input name="company" id="new-input" placeholder=${u.company}></input></label>
        </div>
        <div class="col">
        <label><input name="position" id="new-input" placeholder=${u.position}></input></label>
        </div>
        <div class="col">
        <label><input name="appLink" id="new-input" placeholder=${u.appLink}></input></label>
        </div>
        <div class="col">
        <label><input name="openDate" type="date" id="new-input" placeholder=${u.openDate}></label>
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
      </form>
      `;
    tracker?.addEventListener("submit", (e) => {
      e.preventDefault();
      updateTracker(tracker, id);
    });
  }

  // edit tracker and updates
  async function updateTracker(newForm, id) {
    try {
      await fetch(`./tracker/updated-tracker?id=${id}`, {
        method: "POST",
        body: new URLSearchParams(new FormData(newForm)),
      });
      getAllTracker();
    } catch (err) {
      alert(`There is an error updateTracker ${err}`);
    }
  }

  // del tracker fetch
  async function deleteTracker(id) {
    try {
      await fetch(`./tracker/deleteTracker?id=${id}`, {
        method: "POST",
      });
    } catch (err) {
      alert(`There is an error in delete tracker ${err}`);
    }
  }

  getAllTracker();
  getTracker();
  return tracker;
}

Tracker();
