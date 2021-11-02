const { create } = require('domain');
const express = require('express');
const app = express();
const path = require('path');
const { getHeapCodeStatistics } = require('v8');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'public')));


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

setTimeout(function(){
  io.emit('createchart');
},2000)



function getdata(){


  let bear2 = (getRandomInt(1200));
  let bull2 = (getRandomInt(1200));
  let bear4 = (getRandomInt(2400));
  let bull4 = (getRandomInt(2400));

  var data = []
  var sec = 0


  var  timeout = setTimeout(function(){
    let prev = 100;
    for (let i = 0; i < 375; i++) {
      prev += ((getRandomInt(10)*(1 - (Math.random()) * 2)));
      let flash = (getRandomInt(300));
        if (bear4 == flash){
          prev = prev/2
        };
      if (bull4 == flash){
        prev = prev*2
      };
      if (bear2 == flash){
        prev = prev/1.5
      };
      if (bull2 == flash){
        prev = prev*1.5
      };
      data.push({x: i, y: prev});
    }
    console.log(data);
    clearTimeout(timeout);


    var interval = setInterval(function(){
      var yvalue = (data[sec])
      JSON.stringify(yvalue);
      sec = sec + 1
      let price = yvalue.y
      //console.log(price);
      io.emit('newdata', price);

      console.log(price, sec)
      

      if (sec==374){
        clearInterval(interval);
        console.log(price)
        io.emit('clearalltrade', price)
        io.emit('clear');
        clearInterval(interval);
        sec=0
        io.emit('createchart');
        getdata();

        //console.log(data);

        
      }
    

      if (yvalue.y<0){
        clearInterval(interval);
        console.log(price)
        io.emit('clearalltrade', price)
        io.emit('clear');
        
        sec=0
        io.emit('createchart');
        getdata();

        //console.log(data);
        
        
      }
    }, 40)
  }, 5000);
}
getdata();

