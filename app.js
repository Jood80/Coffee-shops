const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");
// create element & render cafe
const renderCafe = (doc) => {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let cross = document.createElement("div");
  let update = document.createElement("div");


  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "x";
  update.textContent = "i";


  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);
  // li.appendChild(update);


  cafeList.appendChild(li);

  //deleting data
  cross.addEventListener("click", (e) => {
    // stop the event poping up
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  });
};

//get all doc from cafes collection- async request => hence we use promise
//.where("city", "==", "Maryland")

//getting data

// db.collection("cafes")
//   .where("city", "==", "Mars")
//   .orderBy("name")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

//saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
  form.name.value = "";
  form.city.value = "";
});

// real-time listener
db.collection("cafes")
  .orderBy("name")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if(change.type === 'added'){
        renderCafe(change.doc)
      }
      else if (change.type === 'removed') {
        let li =cafeList.querySelector('[data-id='+ change.doc.id +']')
        cafeList.removeChild(li)
      
      }
    });
  });

 db.collection('cafes').doc(editedChoice).update({name:'Mario World'})

 //set whill overwrite all doc so we have to provide it with all it needs- this will update name property as well
 db.collection('cafes').doc(updatedChoice).set({city:'Liverpool'})


