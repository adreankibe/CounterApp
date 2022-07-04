
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
    var data = google.visualization.arrayToDataTable([
    ['Effort', 'Amount given'],
    ['Month Target',     100],
    ]);
    var options = {
    pieHole: 0.5,
    pieSliceTextStyle: {
    color: 'black',
    },
    legend: 'none'
    };
    var chart = new google.visualization.PieChart(document.getElementById('donut_single'));
    chart.draw(data, options);
    }



    
    google.charts.load("current", {packages:["calendar"]});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
      var dataTable = new google.visualization.DataTable();
      dataTable.addColumn({ type: 'date', id: 'Date' });
      dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
      dataTable.addRows([
      [ new Date(2022, 3, 13), 37032 ],
      [ new Date(2022, 3, 14), 38024 ],
      [ new Date(2022, 3, 15), 38024 ],
      [ new Date(2022, 3, 16), 38108 ],
      [ new Date(2022, 3, 17), 38229 ],

      ]);
      var chart = new google.visualization.Calendar(document.getElementById('months_in_a_year'));
      var options = {
      title: "Two Rivers Mall Month Entrances",
      height: 350,
      };
      chart.draw(dataTable, options);
      }