const socket = io();
var ctx = document.getElementById('myChart').getContext('2d');

let balance = 1000
socket.on('createchart', () => {
  data = []
  sec = 0
  function map(f, a) {
    let result = []; // Create a new Array
    let i; // Declare variable
    for (i = 0; i != a.length; i++)
        result[i] = f(a[i]);
    return result;
  }
 
  var myChart = new Chart(ctx, {
    type: 'line',
    data:{
      datasets:[{
        fill: false,
        borderWidth: 1,
        radius: 0,
        borderColor: 'rgb(255, 187, 0)',
        tension: 0,
          data: data,
      }],
    },
    labels:{
      display: false,
    },

    options: {
      responsive: true,
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
            display: false,
        }
      },
      scales: {
          y:{
            max:160,
            min:0
          },
          x: {
            type: 'linear',
            display: false,
            max: 375,
            min: 0
          }
      }
    }
  }); 
  socket.on('newdata', (price) => {
    function updateConfigAsNewObject(myChart) {
      var xScale = myChart.scales.x;
      var yScale = myChart.scales.y;
      if ((price*1.2)>myChart.options.scales.y.max){
        let zoom = myChart.options.scales.y.max * 1.4;
        myChart.options.scales.y = {
          max: (zoom),
          min:0,
        };
      }
 
      myChart.data.labels.push(sec++);
      myChart.data.datasets[0].data.push(price);
      console.log(myChart.options.scales.y.max);
      xScale = myChart.scales.x;
      yScale = myChart.scales.y;
      myChart.update();
      document.getElementById("price").innerHTML = Math.floor(price);
      
      function buy(){
        balance = balance - price
        console.log(balance);
      }

      
    }
    updateConfigAsNewObject(myChart);
  })
  socket.on('clear', () =>{
    function deletedata(){
      myChart.data.labels.splice(-1, 1); // remove the label first

      myChart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
    }
    for (var i = 1; i < 374; i++) deletedata(i);
    myChart.options.scales = {
      y:{
        max: (160),
        min:0,
      },
      x: {
        type: 'linear',
        display: false,
        max: (375),
        min: (0),
      }
    };
    myChart.update();

  })
});
function buy(){
  balance = balance - price
  console.log(balance);
}