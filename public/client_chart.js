

const socket = io();
var ctx = document.getElementById('myChart').getContext('2d');

let text = 0
let text_load = "Connection to server"



let balance = 1000
socket.once('clearloading', () => {
  document.getElementById("loading").remove();
  document.getElementById("text").remove();
})
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
      
      xScale = myChart.scales.x;
      yScale = myChart.scales.y;
      myChart.update();
      document.getElementById("price").innerHTML = ("Carl Price: " + (Math.floor(price)) + "$");
      document.getElementById("balance").innerHTML = (" Balance: " + (Math.floor(balance)) + "$");
    }
    updateConfigAsNewObject(myChart);



  })
  socket.on('clear', (price) =>{
    

    function deletedata(){
      
      myChart.data.labels.splice(-1, 1); // remove the label first

      myChart.data.datasets.forEach(dataset => {
        dataset.data.pop();
      });
      
      
      if (ite_buy==1){

        document.getElementById("sellat").innerHTML = ("Buy @:       " + price + "$  ");
        console.log(price)
        console.log(ite_buy)
        balance = balance + price
      }
      if (ite_sell==1){
          document.getElementById("sellat").innerHTML = ("Sell @:       " + price + "$  ");
          console.log(price)

          balance = balance - price
      }
      ite_buy=0
      ite_sell=0
      document.getElementById("ite_sell").innerHTML = ("     Order: " + ite_sell);
      document.getElementById("ite_buy").innerHTML = ("      Order: " + ite_buy);
      document.getElementById("btn-sell").style.backgroundColor = "red";
      document.getElementById("btn-buy").style.backgroundColor = "green";
      document.getElementById("btn-sell").disabled = false;
      document.getElementById("btn-buy").disabled = false;
      document.getElementById("balance").innerHTML = ("Balance: " + (Math.floor(balance)) + "$");
      document.getElementById("sellat").innerHTML = ("Sell @:       $  ");
      document.getElementById("buyat").innerHTML = ("Buy @:       $  ");
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
  



let sellat = 0
let buyat = 0
let ite_buy = 0
let ite_sell = 0
function buy(){

    ite_buy = 1

    if ((ite_sell)==0){
        console.log(ite_buy);
        console.log(ite_sell);
        
        socket.once('newdata', (price) => {
            buyat = price
            balance = balance - buyat
            document.getElementById("buyat").innerHTML = ("Buy @:      " + (Math.floor(buyat)) + "$   ");
            document.getElementById("ite_buy").innerHTML = ("     Order: " + ite_buy);
            document.getElementById("ite_sell").innerHTML = ("    Order: " + ite_sell);
        })
        document.getElementById("btn-buy").disabled = true;
        document.getElementById("btn-buy").style.backgroundColor = "grey";
        
    }

    if ((ite_sell)==(ite_buy)){
        console.log(ite_buy);
        console.log(ite_sell);

        ite_buy=0
        ite_sell=0
        socket.once('newdata', (price) => {
            buyat = price
            balance = balance - buyat
            
            document.getElementById("buyat").innerHTML = ("Buy @:      " + (Math.floor(buyat)) + "$");
            document.getElementById("ite_buy").innerHTML = ("        Order: " + ite_buy);
            document.getElementById("ite_sell").innerHTML = ("       Order: " + ite_sell);
        })
        document.getElementById("btn-sell").disabled = false;
        document.getElementById("btn-buy").disabled = false;
        document.getElementById("btn-sell").style.backgroundColor = "red";
        document.getElementById("btn-green").style.backgroundColor = "green";
   
    }
    
}
function sell(){
    ite_sell = 1


    if ((ite_buy)==0){
        console.log(ite_buy);
        console.log(ite_sell);
        
        socket.once('newdata', (price) => {
            sellat = price
            balance = balance + sellat
            document.getElementById("sellat").innerHTML = ("Sell @:     " + (Math.floor(sellat)) + "$  ");
            document.getElementById("ite_sell").innerHTML = ("     Order: " + ite_sell);
            document.getElementById("ite_buy").innerHTML = ("      Order: " + ite_buy);
        })
        document.getElementById("btn-sell").disabled = true;
        document.getElementById("btn-sell").style.backgroundColor = "grey";
        
    }
    if ((ite_buy)==(ite_sell)){
        console.log(ite_buy);
        console.log(ite_sell);
        ite_buy=0
        ite_sell=0
        socket.once('newdata', (price) => {
            sellat = price
            balance = balance + sellat
            
            document.getElementById("sellat").innerHTML = ("Sell @:       " + (Math.floor(sellat)) + "$  ");
            document.getElementById("ite_sell").innerHTML = ("     Order: " + ite_sell);
            document.getElementById("ite_buy").innerHTML = ("      Order: " + ite_buy);
        })
        document.getElementById("btn-sell").disabled = false;
        document.getElementById("btn-buy").disabled = false;
        document.getElementById("btn-sell").style.backgroundColor = "red";
        document.getElementById("btn-buy").style.backgroundColor = "green";
        

    }

}




setInterval(function(){
  text = text + 1
  if (text == 1){
      text_load = "Connection to server"
  }
  
  if (text == 2){
      text_load = "Connection to server."
  }
  if (text == 3){
      text_load = "Connection to server.."
      
  }
  if (text == 4){
      text_load = "Connection to server..."
      
      text =0
  }
  document.getElementById("text").innerHTML = (text_load);
  }, 200)
