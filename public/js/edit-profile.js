const addExperience = document.getElementById("add");
const experienceDiv = document.querySelector(".expDiv");

const addOne = () => {
  const newInput = document.createElement("textarea");
  const newDiv = document.createElement("textarea");
  newDiv.classList.add("experienceInput");
  newInput.classList.add("form-control");
  newInput.rows = "3";
  //   newInput.classList.add("new-form");
  newInput.placeholder = "experience";
  const deleteBtn = document.createElement("button");

  deleteBtn.innerHTML = "-";
  deleteBtn.style = "margin-left: 5px; display: inline";
  deleteBtn.className = "btn btn-primary";
  deleteBtn.classList.add("delBtn");

  experienceDiv.appendChild(newInput);
  experienceDiv.appendChild(deleteBtn);

  const delBtn = document.querySelector(".delBtn");
  delBtn.addEventListener("click", () => {
    if (delBtn) {
      experienceDiv.removeChild(newInput);
      experienceDiv.removeChild(deleteBtn);
    }
  });
};

addExperience.addEventListener("click", () => {
  addOne();
});
