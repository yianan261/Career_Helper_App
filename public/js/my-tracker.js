// declare api in 'routes'(nodejs)
// implement the "api" method in controllers(nodejs)
// insert "form data" to mongodb based the "api"(vanilla js)
// declare api1 in 'routes'(nodejs)
// implement the "api1": this "api1" is to get all the form data from mongodb(nodejs)
// call "api1" in vanillasJS, in print it out

function Index() {
  const index = {};

  const updatesDiv = document.querySelector("div#updates");

  function renderUpdates(updates) {
    updatesDiv.innerHTML = "";
    console.log("render updates", updates);
    for (let u of updates) {
      const uDiv = document.createElement("div");
      uDiv.className = "container text-center";
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
        fetchUpdates(form);
      });
    }
  }

  async function fetchUpdates(form) {
    try {
      const res = await fetch("./tracker", {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
      });
      const updates = await res.json();
      console.log("test fetch update", res);
      renderUpdates(updates);
    } catch (err) {
      alert(`There is an error ${err}`);
    }
  }

  getTracker();
  return index;
}

Index();
