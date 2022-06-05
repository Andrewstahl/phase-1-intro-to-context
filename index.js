// Your code here
function createEmployeeRecord(array) {
  const employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord;
}

function createEmployeeRecords(array) {
  let employeeRecordsArray = [];
  for (let record of array) {
    employeeRecordsArray.push(createEmployeeRecord(record));
  }
  return employeeRecordsArray;
}

function createTimeInEvent(employeeRecord, timeStamp) {
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    date: timeStamp.split(" ")[0],
    hour: parseInt(timeStamp.split(" ")[1])
  })
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeStamp) {
  const convertedDate = new Date(timeStamp);
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    date: timeStamp.split(" ")[0],
    hour: parseInt(timeStamp.split(" ")[1])
  })
  return employeeRecord;
}

function hoursWorkedOnDate(employee, date) {
  let totalHours = 0;
  let timeIn;
  let timeOut;
  
  let len = employee.timeInEvents.length;
  for (let i = 0; i < len; ++i) {
  // for (timeInPunch of employee.timeInEvents) {
    if (date === employee.timeInEvents[i].date) {
      // since we know that there is always a corresponding time-out punch,
      // we're going to pull in the time out punch in the exact same spot
      // on the timeOutEvents array.
      timeIn = employee.timeInEvents[i].hour;
      timeOut = employee.timeOutEvents[i].hour;
      totalHours = (timeOut - timeIn) / 100;

      // We can also simplify this to one line, but that makes it a bit more
      // convoluted
      // totalHours = employee.timeOutEvents[i].time - employee.timeInEvents[i].time
    }
  }

  return totalHours;
}

function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  let totalSum = 0;
  let datesArray = employee.timeInEvents.map(x => x.date)

  for (let date of datesArray) {
    totalSum += wagesEarnedOnDate(employee, date)
  }

  return totalSum;
}

function calculatePayroll(employeesArray) {
  let totalSum = 0;

  for (let employee of employeesArray) {
    totalSum += allWagesFor(employee)
    console.log("Total Sum: " + totalSum);
  }

  return totalSum;
}

// // Tests
const csvDataEmployees = [
  ["Thor", "Odinsson", "Electrical Engineer", 45],
  ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
  ["Natalia", "Romanov", "CEO", 150],
  ["Darcey", "Lewis", "Intern", 15],
  ["Jarvis", "Stark", "CIO", 125],
  ["Anthony", "Stark", "Angel Investor", 300]
]

const csvTimesIn = [
  ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
  ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
  ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
  ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
  ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
]

const csvTimesOut = [
  ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
  ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
  ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
  ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
]

let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function (rec) {
  let timesInRecordRow = csvTimesIn.find(function (row) {
    return rec.firstName === row[0]
  })

  let timesOutRecordRow = csvTimesOut.find(function (row) {
    return rec.firstName === row[0]
  })

  timesInRecordRow[1].forEach(function(timeInStamp){
    createTimeInEvent(rec, timeInStamp)
  })

  timesOutRecordRow[1].forEach(function(timeOutStamp){
    createTimeOutEvent(rec, timeOutStamp)
  })
})

console.log(calculatePayroll(employeeRecords));