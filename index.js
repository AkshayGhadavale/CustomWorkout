
let timearray;

function callApi(){
  const token = localStorage.getItem('token')
  fetch("http://localhost:9000/excersise",{
    method:"GET",
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }).then(res=>{
    if(!res.ok){
      throw new Error("No data found")
    }

    return res.json()
  }).then(data=>{
    timearray = data
    console.log(timearray)
    showeex();
  })
  .catch(err=>console.log(err))
}


setTimeout(()=>{

  callApi()
}, 3000)





// let timearray = [
//   ["Plank", 2, 0, "./images/coach-coach-josh-wood.gif"],
//   ["pushups", 4, 0, "./images/pushup.gif"],
//   ["Crunches", 0, 10, "./images/abdominal-supra-abdominal.gif"],
//   ["Boxing", 0, 10, "./images/pov-boxing.gif"],
// ];
let currentIndex = 0;
let timer;
let count2;

function showeex() {
  const listElement = document.getElementById("list");
  listElement.innerHTML = ''; // Clear the existing list

  for (let i = 0; i < timearray.length; i++) {
    let item = document.createElement("li");
    item.className = "exerciseitem";
    item.draggable = true;
    item.setAttribute("data-index", i); 

    let name = document.createElement("input");
    name.type = "text";
    name.className = "exitemname";
    name.id = `exercisename${i}`;
    name.value = timearray[i].name;
    name.readOnly=true;

    
    let imag = document.createElement("img");
    imag.src = timearray[i].image
    // imag.style.width="20px"

    let minnum = document.createElement("input");
    minnum.type = "text";
    minnum.id = `time${i}`;
    minnum.value = timearray[i].time;
    minnum.readOnly=true;

    let  secnum= document.createElement("input");
    secnum.type = "text";
    secnum.id = `time${i}`;
    secnum.value = timearray[i].time;
    secnum.readOnly=true;


    let timex = document.createElement("div");
    timex.className = "exitemtime";
    timex.appendChild(imag)
    timex.appendChild(minnum);
    timex.appendChild(secnum);
    item.appendChild(name);
    item.appendChild(timex);

    // Add Edit button
    let editButton = document.createElement("div");
    editButton.value='edit'
   editButton.style.width="20px";
   editButton.style.height="20px";
    editButton.style.backgroundImage="url(./images/icons8-edit-96.png)"
    editButton.style.backgroundPosition="center"
    editButton.style.backgroundSize="cover"
    editButton.style.backgroundRepeat="norepeat"

    editButton.id = `editbutton${i}`;
    editButton.addEventListener("click", () => {
      if (editButton.value === "edit") {
        editButton.value = "Save";
        editButton.style.width="20px";
        editButton.style.fontSize='0'
   editButton.style.height="20px";
    editButton.style.backgroundImage="url(./images/icons8-save-96.png)"
    editButton.style.backgroundPosition="center"
    editButton.style.backgroundSize="cover"
    editButton.style.backgroundRepeat="norepeat"
        editItem(i);
      } else {
        arrayupdate();
        editButton.style.width="20px";
        editButton.style.height="20px";
         editButton.style.backgroundImage="url(./images/icons8-edit-96.png)"
         editButton.style.backgroundPosition="center"
         editButton.style.backgroundSize="cover"
         editButton.style.backgroundRepeat="norepeat"
        editButton.value = "edit";
      
        document.getElementById(`exercisename${i}`).style.backgroundColor ="transparent";
        document.getElementById(`time${i}`).style.backgroundColor="transparent";
        document.getElementById(`timesec${i}`).style.backgroundColor ="transparent";
        document.getElementById(`exercisename${i}`).readOnly = true;
        document.getElementById(`time${i}`).readOnly = true;
        document.getElementById(`timesec${i}`).readOnly = true;
   
      }
    });
    

    // Add Delete button
    let deleteButton = document.createElement("div");
    deleteButton.value = "Delete";
    deleteButton.id=`deletebutton${i}`;
    deleteButton.style.width="20px";
    deleteButton.style.height="20px";
     deleteButton.style.backgroundImage="url(./images/icons8-delete-64.png)"
     deleteButton.style.backgroundPosition="center"
     deleteButton.style.backgroundSize="cover"
     deleteButton.style.backgroundRepeat="norepeat"
    
    deleteButton.addEventListener("click", () => {
      
      deleteItem(i);
    });

    let buttons = document.createElement("div");
    buttons.className = "buttons";

    buttons.appendChild(deleteButton);
    buttons.appendChild(editButton);
    item.appendChild(buttons);

    listElement.appendChild(item);
  }
  listElement.addEventListener("dragstart", handleDragStart);
  listElement.addEventListener("dragover", handleDragOver);
  listElement.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.dataset.index);
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
  const toIndex = parseInt(e.target.dataset.index);

  // Update the array
  const [draggedItem] = timearray.splice(fromIndex, 1);
  timearray.splice(toIndex, 0, draggedItem);

  // Redraw the list

}


function editItem(i) {
  // Implement the logic to handle editing the item at the specified index
  

 
    document.getElementById(`exercisename${i}`).readOnly=false;
  document.getElementById(`time${i}`).readOnly=false;
  document.getElementById(`timesec${i}`).readOnly=false;
  document.getElementById(`exercisename${i}`).style.backgroundColor="#ffffff"
  document.getElementById(`time${i}`).style.backgroundColor="#ffffff"
  document.getElementById(`timesec${i}`).style.backgroundColor="#ffffff"

  let newName = document.getElementById(`exercisename${i}`).value;
  let newMin = document.getElementById(`time${i}`).value
  let newSec = document.getElementById(`timesec${i}`).value

  document.getElementById(`editbutton${i}`).innerText='save'


  if (newName !== null && newMin !== null && newSec !== null) {
    timearray[index] = [newName, Number(newMin), Number(newSec)];
    showeex(); // Refresh the list after editing
  }
  
 
}

function deleteItem(index) {
  // Implement the logic to handle deleting the item at the specified index
  timearray.splice(index, 1);
  showeex(); // Refresh the list after deletion
}

document.getElementById("nextbutton").addEventListener("click", () => {
if(currentIndex>=timearray.length-1){
  alert("Workouts finish")
  document.getElementById("min").innerText = '00';
  document.getElementById("seconds").innerText = '00';
   currentIndex = 0;
 timer=0;
 count2=0;
}else{
  console.log(`this is array length ${timearray.length}`)
  clearInterval(timer);
  loopmain(timearray[currentIndex + 1]);
  currentIndex++;
  console.log(`this is current index ${currentIndex}`);
  
  }
});


document.getElementById("previousbutton").addEventListener("click", () => {
  loopmain(timearray[currentIndex - 1]);
  currentIndex--;
  console.log(currentIndex)
});



function showPopupWithTimer(timerDuration, callback) {
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popupText");
  popup.style.display = "block";
  let countdown = timerDuration;

  function updateCountdown() {
    popupText.innerText = `Next exercise in ${countdown} seconds`;
    document.getElementById("count").style.visibility = "hidden";
    if (countdown === 0) {
      document.getElementById("count").style.visibility = "visible";
      popup.style.display = "none";

      callback();
    } else {
      countdown--;
      setTimeout(updateCountdown, 1000);
    }
  }

  updateCountdown();
}

function loopmain(data) {
  console.log(`get data form nextbutton ${data}`);

  document.getElementById("text1").innerText = data.name;
  // console.log(`main data ${data[1]}`);
  // console.log(`${data[2]}`);
  document.getElementById("wkimg").src = data.image;

  let start = 60;
  let min = data.time;
  console.log(min);
  let sec = data.time;
  let breaktime = 10;
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
  console.log(min);
  count2 = function count1(countx) {
    if (!isPaused) {
      document.getElementById("min").innerText = min;
      document.getElementById("seconds").innerText = sec;

      if (countx == 0) {
        start = 60;
        sec--;

        if (sec === 0 && min === 0) {
          
          if(currentIndex>=timearray.length-1){
            alert("All exercises completed auto");
            
             currentIndex = 0;
             timer=0;
             count2=0;
             clearInterval(timer);
             document.getElementById("min").innerText = '00';
            document.getElementById("seconds").innerText = '00';
            
          }else{
            clearInterval(timer);
          showPopupWithTimer(10, () => {
            if (currentIndex < timearray.length - 1) {
              currentIndex++;
              loopmain(timearray[currentIndex]);
            } else {
//               alert("All exercises completed");
//               document.getElementById("min").innerText = '00';
//               document.getElementById("seconds").innerText = '00';
//                currentIndex = 0;
//  timer=0;
//  count2=0;
            }
          });}
        }
      }

      if (sec == 0) {
        sec = 60;
        start = 60;
        if(currentIndex>=timearray.length-1)
        { document.getElementById("min").innerText ='00';
        currentIndex = 0;
             timer=0;
             count2=0;
            }
            else{
        min--;
      }
      
         
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

// document.getElementById("arraybtn").addEventListener("click", () => {
//   arrayupdate();
// });

function arrayupdate() {
  console.log("click");
  for (let i = 0; timearray.length > i; i++) {
    timearray[i].name = document.getElementById(`exercisename${i}`).value;
    timearray[i].time = document.getElementById(`time${i}`).value;
    timearray[i].time = document.getElementById(`timesec${i}`).value;

  }
  console.log(timearray);
}

document.getElementById("addrow").addEventListener("click", () => {
  addex();
});

function addex() {
  let exname = document.getElementById("nameex").value;
  let minex = document.getElementById("minex").value;
  let secex = document.getElementById("secex").value;
  let imagelink = document.getElementById("imagelink").value;

  if(exname=='' && minex=='' && secex==''&& imagelink==''){
alert('somethings missing')
  }else{

  
  console.log(exname, minex, secex,imagelink);
  timearray.push([exname, Number(minex), Number(secex),imagelink]);
  console.log(timearray);

// Remove all child elements from the "list" element
let listElement = document.getElementById("list");
while (listElement.firstChild) {
  listElement.removeChild(listElement.firstChild);
}
  }
// reshow  the list
showeex();


}

function callShow (){
  showeex();
}

