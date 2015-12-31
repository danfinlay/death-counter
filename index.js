var fs = require('fs');
var path = require('path');
var csv = require('csv-stream')
var _ = require('lodash');

var filePath = path.join(__dirname, 'VS14MORT.csv');
var csvStream = csv.createStream({});

var displayMode = false;


var causeMap = {
  ' 1': 'Accident',
  ' 2': 'Suicide',
  ' 3': 'Homicide',
  ' 4': 'Pending investigation',
  ' 5': 'Could not determine',
  ' 6': 'Self-Inflicted',
  ' 7': 'Natural',
  ' ': 'Not specified'
};

var causeCount = {};
var message = '';

fs.createReadStream(filePath).pipe(csvStream)
.on('error', (err) => {
    console.log('Error counting deaths.')
    console.dir(err);
    throw err;
})

.on('data', (data) => {
  var mannerCode = data[' Manner_Of_Death'];
  var manner = causeMap[mannerCode];

  if (!(manner in causeCount)) {
    causeCount[manner] = { name: manner, count: 0 };
  }

  causeCount[manner].count++;
  updateDisplay();
})

.on('end', () => {
  clearDisplay();

  var results = [];
  for (var cause in causeCount) {
    results.push(causeCount[cause]);
  }

  // Sort those results:
  var sorted = _.sortBy(results, 'count');

  var results = JSON.stringify(sorted, null, 2);
  console.log(results);
});

function updateDisplay() {
  if (!displayMode) return;
  message = JSON.stringify(causeCount, null, 2);
  process.stdout.write(message);
}

function clearDisplay() {
  if (!displayMode) return;
  for (var i = 0; i < message.length; i++) {
    process.stdout.write('\b');
  }
}
