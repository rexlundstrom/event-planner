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

  let currentEvents = getEventData(); // TO - DO: get these from storage

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
    let anchorTag = itemNode.querySelector("a");
    anchorTag.innerHTML = cityName;
    anchorTag.setAttribute("data-string", cityName);
    // append it to the dropdown menu
    dropDownMenu.appendChild(itemNode);
  }

  displayEventData(currentEvents);
  displayStats(currentEvents);
  document.getElementById('location').innerText = 'All Events';
};

const displayEventData = (currentEvents) => {
  const eventTable = document.getElementById("eventTable");
  const template = document.getElementById("tableRowTemplate");

  eventTable.innerHTML = "";

  for (let i = 0; i < currentEvents.length; i++) {
    let event = currentEvents[i];
    let tableRow = document.importNode(template.content, true);

    tableRow.querySelector('[data-id="event"]').textContent = event.event;
    tableRow.querySelector('[data-id="city"]').textContent = event.city;
    tableRow.querySelector('[data-id="state"]').textContent = event.state;
    tableRow.querySelector('[data-id="attendance"]').textContent =
      event.attendance.toLocaleString();
    tableRow.querySelector('[data-id="date"]').textContent = new Date(event.date).toLocaleDateString();

    eventTable.appendChild(tableRow);
  }
};

const calculateStats = (currentEvents) => {
  let total = 0;
  let most = currentEvents[0].attendance;
  let least = currentEvents[0].attendance;
  let average = 0;

  currentEvents.forEach((thisEvent) => {
    let currentAttendance = thisEvent.attendance;

    total += currentAttendance;
    if (most < currentAttendance) most = currentAttendance;
    if (least > currentAttendance) least = currentAttendance;
  });

  average = total / currentEvents.length;

  return {
    total: total,
    average: average,
    most: most,
    least: least,
  };
};

const displayStats = (currentEvents) => {
  let statistics = calculateStats(currentEvents);
  document.getElementById("total").textContent =
    statistics.total.toLocaleString();
  document.getElementById("average").textContent = Math.round(
    statistics.average
  ).toLocaleString();
  document.getElementById("most").textContent =
    statistics.most.toLocaleString();
  document.getElementById("least").textContent =
    statistics.least.toLocaleString();
};

const getEventData = () => {
  let data = localStorage.getItem("stadiumStatsEventData");

  if (data == null) {
    localStorage.setItem("stadiumStatsEventData", JSON.stringify(events));
  }

  let currentEvents = data == null ? events : JSON.parse(data);

  return currentEvents;
};

const viewFilteredEvents = (dropDownItem) => {
  let cityName = dropDownItem.getAttribute("data-string");

  // get all events
  let allEvents = getEventData();

  if (cityName == 'All') {
    displayStats(allEvents);
    displayEventData(allEvents);
    document.getElementById("location").innerText = cityName;

    return;
  }

  // filter to just selected city
  let filteredEvents = allEvents.filter(
    (event) => event.city.toLowerCase() == cityName.toLowerCase()
  );

  // display stats for those events
    displayStats(filteredEvents);
  // change the stats header
    document.getElementById('location').innerText = cityName;
  // display only those events in the table
  displayEventData(filteredEvents);
};

const saveNewEvent = () => {
  // get the form input values
  let name = document.getElementById('eventName').value;
  let city = document.getElementById('cityName').value;
  let attendance = parseInt(document.getElementById('attendance').value, 10);
  // let state = document.getElementById("newEventState");
  let dateValue = document.getElementById('eventDate').value;
  dateValue = new Date(dateValue);

  let date = dateValue.toLocaleDateString();

  let stateSelect = document.getElementById('newEventState');
  let stateIndex = stateSelect.selectedIndex;
  let state = stateSelect.options[stateIndex].text;
  // create a new event object
  const newEvent = {
    event: name,
    city: city,
    state: state,
    attendance: attendance,
    date: date
  }
  // add it to the array of current events
  let events = getEventData();
  events.push(newEvent);

  // then, save the array with the new event (local storage)
  localStorage.setItem("stadiumStatsEventData", JSON.stringify(events));

  buildDropDown();
}