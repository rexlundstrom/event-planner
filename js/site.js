const events = [
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

// build dropdown for specific cities

const buildDropDown = () => {
  let dropDownMenu = document.getElementById("eventDropDown");
  dropDownMenu.innerHTML = "";

  let currentEvents = events; // TO - DO: get these from storage

  const cityNames = currentEvents.map((event) => event.city);
  const citiesSet = new Set(cityNames);
  let distinctCities = [...citiesSet];

  const dropDownTemplate = document.getElementById("dropDownItemTemplate");

  // copy the template
  let dropDownItemNode = document.importNode(dropDownTemplate.content, true);

  // make our changes
  let dropDownItemLink = dropDownItemNode.querySelector("a");
  dropDownItemLink.innerHTML = "All Cities";
  dropDownItemLink.setAttribute("data-string", "All");

  // add our copy to the page
  dropDownMenu.appendChild(dropDownItemNode);

  for (let i = 0; i < distinctCities.length; i++) {
    // get city name
    let cityName = distinctCities[i];

    // generate dropdown menu
    let itemNode = document.importNode(dropDownTemplate.content, true);
    let anchorTag = itemNode.querySelector('a');
    anchorTag.innerHTML = cityName;
    anchorTag.setAttribute('data-string', cityName);
    // append it to the dropdown menu
    dropDownMenu.appendChild(itemNode);
  }

  displayEventData(currentEvents);
};

const displayEventData = (currentEvents) => {
  const eventTable = document.getElementById("eventTable");
  const template = document.getElementById('tableRowTemplate');

  eventTable.innerHTML = '';

  for (let i = 0; i < currentEvents.length; i++) {
    let event = currentEvents[i];
    let tableRow = document.importNode(template.content, true);
    
    tableRow.querySelector('[data-id="event"]').textContent = event.event;
    tableRow.querySelector('[data-id="city"]').textContent = event.city;
    tableRow.querySelector('[data-id="state"]').textContent = event.state;
    tableRow.querySelector('[data-id="attendance"]').textContent = event.attendance;
    tableRow.querySelector('[data-id="date"]').textContent = event.date;

    eventTable.appendChild(tableRow)
  }
}