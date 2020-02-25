
var showOn = false;

fetchArt();

function fetchArt(){
fetch('http://https://comp4711-lab5-node.herokuapp.com//loadartists', {
    method: 'GET',
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
    }
   })
   .then((res) => {
        return res.json();
   })
   .then((data) => {
        console.log(data)
        clearList();
        loadArtists(data);
    
        
   })
}

document.getElementById("searchIn")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("search").click();
    }
});

function showDiv() {
    if(!showOn){
        showOn = true;
        document.getElementById('TheAdder').style.display = "block";
    }
    else{
        showOn = false;
        var x = document.getElementById("myForm");
        x.reset(); 
        document.getElementById('TheAdder').style.display = "none";
    }
}

function search() {
    var x = document.getElementById("searchIn");
    word = x.value;
    console.log(word);
    let theWord = {
        words: word
        };
        fetch('/search', {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(theWord)
        })
        .then((response) => response.json())
        .then((data) => {
            clearList();
            loadArtists(data);
        })
        .catch((err) => console.log(err))

}

function addArtist() {
   
    var Name = "";
    var About = "";
    var URL = "";
    var x = document.getElementById("myForm");
    Name = x.elements[0].value;
    About = x.elements[1].value;
    URL = x.elements[2].value;
    if(URL.length == 0){
        URL = "https://via.placeholder.com/150";
    } 

    if(Name.length == 0){
        Name = "Error";
    }
    if(About.length == 0){
        About = "Error";
    } 
    let artist = {
        name: Name,
        about: About,
        url: URL
        };
        fetch('/add', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(artist)
        })
        .then((response) => response.json())
        .then((data) => {
            
            fetchArt();
        })
        .catch((err) => console.log(err))
    showDiv();
    
  }

function deleteArtist(btn){
   
    var ind = btn.value;
    let index = {
        indx: ind
        };
        fetch('/delete', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(index)
        })
        .then((response) => response.json())
        .then((data) => {
            
            fetchArt();
            
        })
        .catch((err) => console.log(err))
       

}

function clearList(){
    var x = document.getElementById('list');
    var child = x.lastElementChild;  
    while (child) { 
        x.removeChild(child); 
        child = x.lastElementChild; 
    } 
}

function noValidImg(image){
    image.src = "https://via.placeholder.com/150";
}

function loadArtists(json){

   
    ind = 0;
    for(var i = 0; i < json.length; i++){
    var Name = "";
    var About = "";
    var URL = "";
    var ind = 0;
    Name = json[i].name;
    About = json[i].about;
    URL = json[i].url;
    ind = json[i].id;
   
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    var div_person = document.createElement("div");
    div_person.setAttribute("id", "person");
    var img = document.createElement("img");
    img.setAttribute("id", "myImg")
    img.setAttribute("src", URL);
    img.setAttribute("alt", name);
    img.setAttribute("onError","noValidImg(this)")
    var div_info = document.createElement("div");
    div_info.setAttribute("id", "info");
    var p_name = document.createElement("p");
    p_name.setAttribute("id", "name");
    var p_about = document.createElement("p");
    var div_butt = document.createElement("div");
    div_butt.setAttribute("id", "delCont");
    var butt = document.createElement("button");
    butt.setAttribute("id", "mainDel");
    butt.setAttribute("onClick", "deleteArtist(this)");
    butt.setAttribute("value", ind);
    ul.insertBefore(li, ul.firstChild);
    li.appendChild(div_person);
    div_person.appendChild(img);
    div_person.appendChild(div_info);
    div_info.appendChild(p_name);
    div_info.appendChild(p_about);
    p_name.appendChild(document.createTextNode(Name));
    p_about.appendChild(document.createTextNode(About));
    div_person.appendChild(div_butt);
    div_butt.appendChild(butt);
    butt.appendChild(document.createTextNode("Delete"));

   }
  
}