let terms;
if (localStorage.getItem('terms') === null){
  terms = [];
} else {
  terms = JSON.parse(localStorage.getItem('terms'));
}

let gradeD = [0, 0, 0, 0, 0, 0];
for (var i = 0 ; i < terms.length ; i++) {
  var subjects = terms[i].subjects;
  for (var j = 0 ; j < subjects.length ; j++) {
    if (Number(subjects[j].grade) >= 5 && Number(subjects[j].grade) <= 10) {
      gradeD[parseInt(subjects[j].grade)-5]++;
    }
  }
}

var ctx = document.getElementById('myChart');

var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['5', '6', '7', '8', '9', '10'],
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
    },
    options: {
           yAxes: [{
               ticks: {
                   beginAtZero: true
               }
           }]
    }
});
