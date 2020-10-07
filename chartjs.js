let terms;
if (localStorage.getItem('terms') === null){
  terms = [];
} else {
  terms = JSON.parse(localStorage.getItem('terms'));
}

// Chart #1 (grades distribution)
let gradeD = [0, 0, 0, 0, 0, 0];
for (var i = 0 ; i < terms.length ; i++) {
  var subjects = terms[i].subjects;
  for (var j = 0 ; j < subjects.length ; j++) {
    if (Number(subjects[j].grade) >= 5 && Number(subjects[j].grade) <= 10) {
      gradeD[10-parseInt(subjects[j].grade)]++;
    }
  }
}

var ctx1 = document.getElementById('myChart1');

var myChart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['10', '9', '8', '7', '6', '5'],
        datasets: [{
            data: gradeD,
            backgroundColor: [
                'rgba(255, 99, 132, 0.4 )',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
});

// Chart #2 (average grade progression across terms)
let labels = [];
let avgGrades = [];
for (var i = 0 ; i < terms.length ; i++) {
  labels.push(terms[i].title);
  avgGrades.push(Math.round(terms[i].avg * 10)  / 10);
}

var ctx2 = document.getElementById('myChart2');

var myChart2 = new Chart(ctx2, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: avgGrades,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0)',
        borderWidth: 2
      }]
    },
    options: {
      scales: {
           yAxes: [{
               ticks: {
                   min: 5,
                   max: 10,
               }
           }]
        }
    },
});

// Chart #3 (Progress until graduation)
var bar = new ProgressBar.Line(chart3,
{
  strokeWidth: 3,
  color: 'rgba(75, 192, 192, 0.8)',
  trailColor: '#eee',
  trailWidth: 3,
  svgStyle: {width: '100%', height: '100%'},
  text: {
    style: {
      color: '#999',
      position: 'absolute',
      right: '50%',
      top: '100%',
      padding: 0,
      margin: 0,
    },
    autoStyleContainer: false
  },
  from: {color: '#FFEA82'},
  to: {color: '#ED6A5A'},
  step: (state, bar) => {
    bar.setText(Math.round(bar.value() * 100) + '%');
  }
});

bar.animate(document.querySelectorAll(".subject").length / 55);
