let jsonData; // Assume you have the JSON data stored here

document.addEventListener("DOMContentLoaded", function() {
  // Fetch JSON data and populate UI
  fetchDataAndPopulateUI();

  // Order data based on descending popularity and display in the table
  displayData();
});

function fetchDataAndPopulateUI() {
  // Simulate fetching JSON data
  // Replace this with your actual fetching logic
  jsonData = [
    // Your 1000 product records here
  ];

  // Populate available fields select box
  const availableFieldsSelect = document.getElementById("availableFields");
  const productAttributes = Object.keys(jsonData[0]);
  productAttributes.forEach(attribute => {
    const option = document.createElement("option");
    option.value = attribute;
    option.text = attribute;
    availableFieldsSelect.appendChild(option);
  });
}

function addFields() {
  moveSelectedOptions("availableFields", "displayedFields");
}

function removeFields() {
  moveSelectedOptions("displayedFields", "availableFields");
}

function moveSelectedOptions(sourceId, destinationId) {
  const sourceSelect = document.getElementById(sourceId);
  const destinationSelect = document.getElementById(destinationId);

  Array.from(sourceSelect.selectedOptions).forEach(option => {
    const clonedOption = option.cloneNode(true);
    destinationSelect.appendChild(clonedOption);
    option.remove();
  });
}

function displayData() {
  // Order data based on descending popularity
  const sortedProducts = jsonData.sort((a, b) => b.Popularity - a.Popularity);

  // Display headers in the table
  const table = document.getElementById("productTable");
  const displayedFieldsSelect = document.getElementById("displayedFields");

  Array.from(displayedFieldsSelect.options).forEach(option => {
    const th = document.createElement("th");
    th.textContent = option.value;
    table.appendChild(th);
  });

  // Display data in the table
  sortedProducts.forEach(product => {
    const row = table.insertRow();
    Array.from(displayedFieldsSelect.options).forEach(option => {
      const cell = row.insertCell();
      cell.textContent = product[option.value];
    });
  });
}
