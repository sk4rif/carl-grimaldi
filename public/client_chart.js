//Hey hackers ! This is the creator of the website :) Feel free to check-out any loopholes. 
//I'm just 20y.o so I'm sure there are a few corrections to make. If you are kind enough, can you tell me where are the problemes.
//I'm passionated about JS and cryptos, if you can help me it would be great thanks !!!


const socket = io();
var ctx = document.getElementById('myChart').getContext('2d');

let balance = 1000

socket.on('loading', () => {
    document.getElementById("loading").remove();
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
      document.getElementById("balance").innerHTML = ("Balance: " + balance + "$");
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
  

socket.on('hide', () =>{
  document.getElementById("countdown").style.visibility="hidden";
  document.getElementById("price").style.visibility="visible";
})
socket.on('visible', () =>{
  document.getElementById("price").style.visibility="visible";
    document.getElementById("countdown").style.visibility="hidden";
})
socket.on('countdown', (s) =>{
  document.getElementById("countdown").innerHTML = 'Next Round in ' + (s);
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
            document.getElementById("buyat").innerHTML = ("Buy @:      " + buyat + "$   ");
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
            
            document.getElementById("buyat").innerHTML = ("Buy @:      " + buyat + "$");
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
            document.getElementById("sellat").innerHTML = ("Sell @:     " + sellat + "$  ");
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
            
            document.getElementById("sellat").innerHTML = ("Sell @:       " + sellat + "$  ");
            document.getElementById("ite_sell").innerHTML = ("     Order: " + ite_sell);
            document.getElementById("ite_buy").innerHTML = ("      Order: " + ite_buy);
        })
        document.getElementById("btn-sell").disabled = false;
        document.getElementById("btn-buy").disabled = false;
        document.getElementById("btn-sell").style.backgroundColor = "red";
        document.getElementById("btn-buy").style.backgroundColor = "green";
        

    }

}
socket.on('clearalltrade', (pricefinish) => {

    
    if (ite_buy==1){

        document.getElementById("sellat").innerHTML = ("Buy @:       " + pricefinish + "$  ");
        console.log(pricefinish)
        console.log(ite_buy)
        balance = balance + pricefinish
    }
    if (ite_sell==1){
        document.getElementById("sellat").innerHTML = ("Sell @:       " + pricefinish + "$  ");
        console.log(pricefinish)

        balance = balance - pricefinish
    }
    ite_buy=0
    ite_sell=0
    document.getElementById("ite_sell").innerHTML = ("     Order: " + ite_sell);
    document.getElementById("ite_buy").innerHTML = ("      Order: " + ite_buy);
    document.getElementById("btn-sell").style.backgroundColor = "red";
    document.getElementById("btn-buy").style.backgroundColor = "green";
    document.getElementById("btn-sell").disabled = false;
    document.getElementById("btn-buy").disabled = false;
    document.getElementById("balance").innerHTML = ("Balance: " + balance + "$");
})
