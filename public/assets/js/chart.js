

    const labelss = ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
    const data = {
      labels: labelss,
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    
    const config = {
        type: 'line',
        data: data,
      };
    const myChart = new Chart(
        document.getElementById('peak_hours'),
        config
    );



    const bar_graph_labels = ['Carrefour', 'Basement', 'Banking Area', 'Theme Park', 'Basement 2', 'Core A', 'B1-Core B'];
    const labels = JSON.parse(document.getElementById("labels").value);
    const bar_graph_data = {
    labels: bar_graph_labels,
    datasets: [{
        label: 'Todays Report',
        data: JSON.parse(document.getElementById("data").value),
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
        }]
    };


    const bar_graph_config = {
        type: 'bar',
        data: bar_graph_data,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        },
      };


    const bar_graph_Chart = new Chart(
        document.getElementById('entrances'),
        bar_graph_config
    );

    setInterval(()=>{
      axios.get('/account/realtime/'+building_id).then((response)=>{
          const data = response.data;
          console.log(data)
              // totals
          document.getElementById("todays_total").innerHTML = data.todays_total;
          document.getElementById("weeks_total").innerHTML = data.weeks_total;
          document.getElementById("month_total").innerHTML = data.month_total;
          // graphest

          // events
          let event = data.event;
          if(event !== null)
          {
          
              let id = 'e_'+event._id
              document.getElementById(id).innerHTML = event.total
            
          }
          entrances.data.datasets[0].data = data.data;
          entrances.data.labels = data.labels;
          entrances.update();

        }).catch((error)=>{
          console.log(error)
        })

      },5000)



 
    const progress_config = {
      type: 'line',
      data: data,
      options: {
        animation: {
          duration: 2000,
          onProgress: function(context) {
            if (context.initial) {
              initProgress.value = context.currentStep / context.numSteps;
            } else {
              progress.value = context.currentStep / context.numSteps;
            }
          },
          onComplete: function(context) {
            if (context.initial) {
              console.log('Initial animation finished');
            } else {
              console.log('animation finished');
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        },
        plugins: {
          title: {
            display: true,
            text: 'Chart.js Line Chart - Animation Progress Bar'
          }
        },
      },
    };


    const initProgress = document.getElementById('initialProgress');
    const progress = document.getElementById('animationProgress');

    const DATA_COUNT = 7;
    const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100};

    const progress_labels = Utils.months({count: 7});
    const progress_data = {
      labels: progres_labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.red,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
        },
        {
          label: 'Dataset 2',
          data: Utils.numbers(NUMBER_CFG),
          borderColor: Utils.CHART_COLORS.blue,
          backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
        }
      ]
    };

    const progrees_Chart = new Chart(
      document.getElementById('initialProgress'),
      progress_config
    );  