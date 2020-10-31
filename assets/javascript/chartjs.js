var terms;
if (localStorage.getItem('terms') === null){
  terms = [];
} else {
  terms = JSON.parse(localStorage.getItem('terms'));
}
var passedSubjects = 0;

// Chart #1 (grades distribution)
var gradeD = [0, 0, 0, 0, 0, 0];
for (var i = 0 ; i < terms.length ; i++) {
  var subjects = terms[i].subjects;
  for (var j = 0 ; j < subjects.length ; j++) {
    if (Number(subjects[j].grade) >= 5 && Number(subjects[j].grade) <= 10) {
      gradeD[10-parseInt(subjects[j].grade)]++;
    }
    passedSubjects += (Number(subjects[j].grade >= 5) || subjects[j].grade.toLowerCase() == 'p' ) ? 1 : 0;
  }
}

document.querySelector("#chart1").innerHTML = '<canvas id="myChart1"></canvas>';
var ctx1 = document.querySelector("#myChart1");

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
var labels = [];
var avgGrades = [];
for (var i = 0 ; i < terms.length ; i++) {
  labels.push(terms[i].title);
  avgGrades.push(Math.round(terms[i].avg * 10)  / 10);
}

document.querySelector("#chart2").innerHTML = '<canvas id="myChart2"></canvas>';
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
               //
               // gridLines: {
		           //     color: 'rgba(255, 255, 255, 0.3)'
               // },
               //
               ticks: {
                   min: 5,
                   max: 10,
               }
           }]
           //
           // xAxes: [{
           //     gridLines: {
           //  		   color: 'rgba(255, 255, 255, 0.3)'
           //     }
           // }]
           //
        }
    },
});

// Chart #3 (Progress until graduation)
if (typeof bar != 'undefined')
  document.querySelector("#chart3").innerHTML = '<div style="text-align: center">Progress για πτυχείο</div>';
bar = new ProgressBar.Line(chart3,
{
  strokeWidth: 3,
  color: '#90EE90',
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

bar.animate(passedSubjects / 56);
