// let timearray=[["exerise 1",1],
      // ["exerise 2",4],["exerise 3",6]]

      // let limit=1;

      // function loopmain(data){

      // //  document.getElementById('time1').innerText=data[0][1];
      // console.log(` main data ${data}`)

      // document.getElementById('time1').innerText=data;
      // let start = 60;
      // min = data-1;
      // let sec = 60;
      // let timer;

      //   let count2 = function count1(countx) {
      //     document.getElementById("min").innerText = min;
      //     document.getElementById("seconds").innerText = sec;

      //     if (countx == 0) {
      //       start = 60;
      //       sec--;
      //     }

      //     if (sec == 0) {
      //       sec=60;
      //       start = 60;
      //       min--;
      //       document.getElementById("min").innerText = min;
      //       if(min<0 ){
      //         alert("stop")
      //         min = 0;
      //     }

      //     }

      //   };

      //   // function stop(){
      //   //   window.clearInterval(timer);
      //   // }

      //    timer = setInterval(function () {
      //     count2(start--);
      //   },10);

      //   }

      //   document.getElementById('startButton').addEventListener("click",()=>{

      //     for(let i=0;i<=timearray.length;i++)
      // {

      //   // let min = document.getElementById('time1').innerText=timearray[i][1];
      //   loopmain(timearray[i][1]);

      //

      // }
      //   })

      let timearray = [
        [
            "break",
            0,
            10,
            "/images/coach-coach-josh-wood.gif",
          ],
          [
            "Plank",
            2,0,
            "/images/coach-coach-josh-wood.gif",
          ],
          [
            "pushups",
            4,0,
            "/images/pushup.gif",
          ],
          [
            "Crunches",
            6,0,
            "/images/abdominal-supra-abdominal.gif",
          ],
          [
            "Boxing",
            5,0,
            "/images/pov-boxing.gif",
          ],
        ];
        let currentIndex = 0;
        let timer;
        let count2;
  
        function showeex() {
          for (let i = 0; i < timearray.length; i++) {
            let item = document.createElement("li");
            item.className = "exerciseitem";
            let name = document.createElement("h3");
            name.class = "exitemname";
            name.id = `exercisename${i}`;
            let number = document.createElement("h2");
            number.class = "exitemtime";
            number.id = `time${i}`;
  
            name.innerText = timearray[i][0];
            number.innerText = timearray[i][1]+":"+timearray[i][2];
  
            // let img = document.getElementById('wkimg').src=timearray[i][2]
  
            item.appendChild(name);
            item.appendChild(number);
  
            document.getElementById("list").appendChild(item);
          }
        }
  
        document.getElementById("nextbutton").addEventListener("click", () => {
          console.log(currentIndex);
          clearInterval(timer);
          loopmain(timearray[currentIndex + 1]);
          currentIndex++;
        });
        document
          .getElementById("previousbutton")
          .addEventListener("click", () => {
            loopmain(timearray[currentIndex - 1]);
            currentIndex--;
          });
  
          function showPopupWithTimer(timerDuration, callback) {
      const popup = document.getElementById('popup');
      const popupText = document.getElementById('popupText');
      popup.style.display = 'block';
      let countdown = timerDuration;
  
      function updateCountdown() {
   
        popupText.innerText = `Next exercise in ${countdown} seconds`;
        document.getElementById('count').style.visibility='hidden';
        if (countdown === 0) {
          document.getElementById('count').style.visibility='visible';
          popup.style.display = 'none';
          
          callback();
        } else {
          countdown--;
          setTimeout(updateCountdown, 1000);
        }
      }
  
      updateCountdown();
    }
  
        function loopmain(data) {
          console.log(data);
  
          document.getElementById("text1").innerText = data[0];
          // console.log(`main data ${data[1]}`);
          // console.log(`${data[2]}`);
          document.getElementById("wkimg").src = data[3];
  
          let start = 60;
          let min = data[1];
          console.log(min)
          let sec= data[2];
          let breaktime=10;
        //   if(min>0){
            
        //     // 
        //     min=0;
        //  sec = data[1]*100;
        //  console.log("smaller")
        //   }
        //   else{
        //     sec=60;
        //     min= data[1] - 1;
        //     console.log("greater")
            
        //   }
          console.log(min)
          count2 = function count1(countx) {
        if (!isPaused) {
          document.getElementById("min").innerText = min;
          document.getElementById("seconds").innerText = sec;
  
          if (countx == 0) {
            start = 60;
            sec--;
  
            if (sec === 0 && min === 0) {
              clearInterval(timer);
              showPopupWithTimer(10, () => {
                if (currentIndex < timearray.length - 1) {
                  currentIndex++;
                  loopmain(timearray[currentIndex]);
                } else {
                  alert("All exercises completed");
                }
              });
            }
          }
  
          if (sec == 0) {
            sec = 60;
            start = 60;
            min--;
            document.getElementById("min").innerText = min;
            if (min < 0) {
              min = 0;
              clearInterval(timer);
            }
          }
        }
      };
          let isPaused = false; // Variable to track if the timer is paused
  
          document.getElementById("stopButton").addEventListener("click", () => {
            if (isPaused) {
              // If already paused, resume the timer
              document.getElementById("stopButton").innerText = "Stop";
              timer = setInterval(function () {
                count2(start--);
              }, 10);
              isPaused = false;
            } else {
              document.getElementById("stopButton").innerText = "Resume";
              // If not paused, stop the timer
              clearInterval(timer);
              isPaused = true;
            }
          });
  
          timer = setInterval(function () {
            count2(start--);
          }, 10);
        }
  
        document.getElementById("startButton").addEventListener("click", () => {
          if (currentIndex < timearray.length) {
            loopmain(timearray[currentIndex]);
          } else {
            alert("All exercises completed");
          }
        });
  
        showeex();
  
     