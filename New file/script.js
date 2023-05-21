fetch('https://raw.githubusercontent.com/dixitsoham7/dixitsoham7.github.io/main/index.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('results-body');
    renderData(data, container);

    const searchInput = document.getElementById('search-input');
    const skillCheckboxes = document.getElementsByClassName('skill-checkbox');

    searchInput.addEventListener('input', () => {
      const searchValue = searchInput.value.toLowerCase();
      const filteredData = filterDataByName(data, searchValue);
      container.innerHTML = '';
      renderData(filteredData, container);
    });

    for (let i = 0; i < skillCheckboxes.length; i++) {
      skillCheckboxes[i].addEventListener('change', () => {
        const selectedSkills = getSelectedSkills();
        const filteredData = filterDataBySkills(data, selectedSkills);
        container.innerHTML = '';
        renderData(filteredData, container);
      });
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });

function renderData(data, container) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const employee = data[key];

      const row = document.createElement('tr');

      const nameCell = document.createElement('td');
      nameCell.textContent = employee.name;
      row.appendChild(nameCell);

      const designationCell = document.createElement('td');
      designationCell.textContent = employee.designation;
      row.appendChild(designationCell);

      const skillsCell = document.createElement('td');
      skillsCell.textContent = employee.skills.join(', ');
      row.appendChild(skillsCell);

      container.appendChild(row);
    }
  }
}

function filterDataByName(data, searchValue) {
  const filteredData = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const employee = data[key];

      if (
        employee.name.toLowerCase().includes(searchValue) ||
        employee.designation.toLowerCase().includes(searchValue) ||
        employee.skills.some(skill => skill.toLowerCase().includes(searchValue))
      ) {
        filteredData[key] = employee;
      }
    }
  }

  return filteredData;
}

function getSelectedSkills() {
  const selectedSkills = [];

  const skillCheckboxes = document.getElementsByClassName('skill-checkbox');
  for (let i = 0; i < skillCheckboxes.length; i++) {
    if (skillCheckboxes[i].checked) {
      selectedSkills.push(skillCheckboxes[i].value);
    }
  }

  return selectedSkills;
}

function filterDataBySkills(data, selectedSkills) {
  const filteredData = {};

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const employee = data[key];

      if (selectedSkills.every(skill => employee.skills.includes(skill))) {
        filteredData[key] = employee;
      }
    }
  }

  return filteredData;
}
