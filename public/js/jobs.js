//Yian Chen
function JobClient() {
  const jobClient = {};
  const jobPosts = document.getElementById("jobPosts");

  //function that renders job posts
  const renderPosts = (posts) => {
    jobPosts.innerHTML = "";
    for (let p of posts) {
      const pDiv = document.createElement("div");
      pDiv.className = "card col-xs-3 col-sm-3 ";
      pDiv.style = "margin-bottom:2%;margin-left:2px";
      pDiv.innerHTML = `<div class="card-body">
      <div class="card-title" style="text-align:center; padding-bottom:2% ; padding-top:5%; font-size:large"><label>Company Name: <output>${p.company_name}</output></label></div>
      <div class="position" style="text-align:center; padding-bottom:2%"><label>Job Position: <output>${p.job_position}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label>City: <output>${p.city}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label>State: <output>${p.state}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label><a href=${p.job_url}>Apply Now </a></label></div>      
    </div>`;

      jobPosts.appendChild(pDiv);
    }
  };

  //function that gets the job posts
  const getPosts = async () => {
    const res = await fetch("./jobs/display-jobs");
    const postData = await res.json();
    console.log("res JOB DATA", postData);
    renderPosts(postData);
  };

  getPosts();

  jobClient.getPosts = getPosts;
  return jobClient;
}
JobClient();
