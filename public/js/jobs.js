//Yian Chen
function JobClient() {
  const jobClient = {};
  const jobPosts = document.getElementById("jobPosts");

  //function that renders job posts
  const renderPosts = (posts) => {
    jobPosts.innerHTML = "";
    for (let p of posts) {
      const pDiv = document.createElement("div");
      pDiv.className = "card col-xs-3 col-sm-3";
      pDiv.style = "margin-bottom:2%;margin-left:2px";
      pDiv.innerHTML = `<div class="card-body">
      <div class="card-title" style="text-align:center; padding-bottom:2% ; padding-top:5%; font-size:large"><label>Company Name: <output>${p.company_name}</output></label></div>
      <div class="position" style="text-align:center; padding-bottom:2%"><label>Job Position: <output>${p.job_position}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label>City: <output>${p.city}</output></label></div>
      <div style="text-align:center; padding-bottom:2%"><label>State: <output>${p.state}</output></label></div>
      <hr> 
      <div style="width:100%"> <div class="text"style="font-weight:light;color:#808080">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, laborum? Impedit doloremque at, nisi  </div>
      <div style="text-align:right;overflow:hidden; padding-bottom:2%"><label><a href=${p.job_url}>View More </a></label></div>   </div>
    
    </div>`;

      jobPosts.appendChild(pDiv);
    }
  };

  //function that gets the job posts
  const getPosts = async (_page) => {
    const res = await fetch(`./jobs/display-jobs/?page=${_page}`);
    const postData = await res.json();
    console.log("res JOB DATA", postData);
    renderPosts(postData);
  };

  //function that searches posts
  const searchPosts = () => {
    const search = document.querySelector('input[type="search"]');
    search.addEventListener("search", (evt) => {
      evt.preventDefault();
      console.log("searching");
      findAllPosts(search.value);
    });
  };
  //function that searches posts from fetch
  const findAllPosts = async (keyword) => {
    try {
      const res = await fetch(`./jobs/search/?query=${keyword}`, {
        method: "POST",
        body: new URLSearchParams({ query: `${keyword}` }),
      });
      console.log("line 51 search", res.body);
      const resPosts = await res.json();
      if (!resPosts.data) {
        console.log("NO DATA");
        jobPosts.innerHTML = `${resPosts.msg}`;
      } else {
        renderPosts(jobPosts.data);
      }
    } catch (err) {
      alert(`There is an error ${err}`);
      console.error(err);
    }
  };

  //function that takes care of pagination
  const pagination = () => {
    let currPage = 1;
    let currClick = 1;
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const p1 = document.getElementById("p1");
    const p2 = document.getElementById("p2");
    const p3 = document.getElementById("p3");
    const p4 = document.getElementById("p4");

    prev.addEventListener("click", (evt) => {
      evt.preventDefault();
      currPage -= 4;
      getCurrPage(currPage);
      getPosts(currClick);
    });

    next.addEventListener("click", (evt) => {
      evt.preventDefault();
      currPage += 4;
      getCurrPage(currPage);
      getPosts(currClick);
    });

    const getCurrPage = () => {
      if (currPage > 0) {
        p1.innerHTML = `${currPage}`;
        p2.innerHTML = `${currPage + 1}`;
        p3.innerHTML = `${currPage + 2}`;
        p4.innerHTML = `${currPage + 3}`;
      }
    };
    p1.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p1.innerHTML;
      getPosts(currClick);
    });
    p2.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p2.innerHTML;
      getPosts(currClick);
    });
    p3.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p3.innerHTML;
      getPosts(currClick);
    });
    p4.addEventListener("click", (evt) => {
      evt.preventDefault();
      currClick = p4.innerHTML;
      getPosts(currClick);
    });
  };

  pagination();
  getPosts();
  searchPosts();

  jobClient.getPosts = getPosts;
  return jobClient;
}
JobClient();
