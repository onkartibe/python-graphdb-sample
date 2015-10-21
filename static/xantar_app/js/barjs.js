google.load('visualization', '1', {packages: ['corechart', 'bar']});
google.setOnLoadCallback(drawBasic);

function drawBasic() {

      var data = google.visualization.arrayToDataTable([
        ['Local Spend', 'EAD',],
        ['Newspapers', 8175000],
        ['Magazines', 8175000],
        ['TV', 2695000],
        ['Radio', 2099000],
        ['Cinema', 1526000],
        ['Outdoor', 3792000]
      ]);

      var options = {
        title: 'Advertisement Spend',
        chartArea: {width: '60%'},
        hAxis: {
          title: 'Spend',
          minValue: 0
        },
        backgroundColor: '#',
        vAxis: {
          title: 'Media Type'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));

      chart.draw(data, options);
   }