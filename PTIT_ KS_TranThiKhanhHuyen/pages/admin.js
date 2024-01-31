document.addEventListener("DOMContentLoaded", function () {
    let projectTable = document.getElementById("projectTable");
    let projects = localStorage.getItem("projects")
      ? JSON.parse(localStorage.getItem("projects"))
      : [];
  
    function displayProjects() {
      projectTable.innerHTML = `<tr>
        <th>#</th>
        <th>Project Name</th>
        <th>Image URL</th>
        <th>Link</th>
        <th>Tags</th>
        <th>Action</th>
      </tr>`;
      projects.forEach(function (projects) {
        let row = projectTable.insertRow(-1);
        row.insertCell(0).innerText = projects.id;
        row.insertCell(1).innerText = projects.projectName;
        row.insertCell(2).innerText = projects.imgUrl;
        row.insertCell(3).innerText = projects.link;
        row.insertCell(4).innerText = projects.tags.join(", ");
        let actionCell = row.insertCell(5);
  
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.addEventListener("click", function () {
          deleteProject(projects.id);
        });
        let updateButton = document.createElement("button");
        updateButton.innerText = "Update";
        updateButton.addEventListener("click", function () {
          updateProject(projects.id);
        });
        actionCell.appendChild(deleteButton);
        actionCell.appendChild(updateButton);
      });
    }
    function deleteProject(id) {
      projects = projects.filter((projects) => projects.id !== id);
      localStorage.setItem("projects", JSON.stringify(projects));
      displayProjects();
    }
    function updateProject(id) {
      let update = projects.find((project) => project.id === id);
  
      if (update) {
        update.projectName = prompt("Enter the new project name");
        update.imgUrl = prompt("Enter the new image URL");
        update.link = prompt("Enter the new link");
        update.tags = prompt("Enter the new tags").split(",");
        localStorage.setItem("projects", JSON.stringify(projects));
        displayProjects();
      } else {
        console.error("Project not found with ID: " + id);
      }
    }
    document
      .getElementById("addProject")
      .addEventListener("click", function (event) {
        event.preventDefault();
        let projectName = document.getElementById("project_name").value;
        let imgUrl = document.getElementById("img_url").value;
        let link = document.getElementById("link").value;
        let tags = document.getElementById("tag").value.split(",");
        let newProject = {
          id: projects.length + 1,
          projectName: projectName,
          imgUrl: imgUrl,
          link: link,
          tags: tags,
        };
        projects.push(newProject);
        localStorage.setItem("projects", JSON.stringify(projects));
        displayProjects();
      });
    displayProjects();
  });