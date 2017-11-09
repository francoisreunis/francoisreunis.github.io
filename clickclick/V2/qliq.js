let clicks = 0;
let butt= $('#clicker');
let counter= $('.compteur2 h1')
let name ="";
let counterTotal= $('.compteur h1');
let currPosition = 0;

$('#yourPos').css('display', 'none')

let users= []

const storedName = localStorage.getItem("username");
if(storedName && storedName !== "null"){
     name=storedName;
     eventSave(name)
     console.log(name);
}

function addOne(){
    if(name !==""){
        clicks++;
        counter.text(clicks);
        saveToDatabase() //cela sauve dans la database a chaque fois qu'on appelle la fonction addOne
    }else{
        alert('Please enter your username')
    }
}
butt.click(addOne)


function saveToDatabase(){
    firebase.database().ref("/clicks/"+name).set(clicks) 
}


function comparerScore(a, b){
    return b.score-a.score
}

let starCountRef = firebase.database().ref('/clicks/')
function snapshot(data){
    console.log("starcountref")
    const value = data.val();
    const keys = Object.keys(value);
    console.log(keys)
    $('#userList').html("")
    $('#userClicks').html("")
    users=[]
    let total= 0;
    for(let key of keys){
        let objet= {
            username:key,
            score:value[key]
        }
        users.push(objet)
        total= total+value[key]
    }
    users.sort(comparerScore);
    
    counterTotal.text(total);

    for(let i=0; i<users.length; i++){
        if(users[i].username === name){
            currPosition = i+1;
            $('#taPosition').text(currPosition+'.')
            break;
        }
    }
    console.log(currPosition);

    for(let user of users.slice(0,10)){
        let newLi= $('<li>').text(user.username);
        $('#userList').append(newLi);
    
        let newScore= $('<li>').text(user.score);
        $('#userClicks').append($(newScore));
    }
    $('#totalPerson').text(users.length + ' people clicked');
};

starCountRef.on('value', snapshot);


// let userRef = firebase.database().ref('/clicks/'+name)
// function updateUser(data){
//     const value = data.val();
//     $('#tonUsername').text(name);
// }
// userRef.on('value', updateUser);

let scoreRef = firebase.database().ref('/clicks/'+name )

function updateUser(data){
    const value = data.val();
    if(!value){
        return;
    }
    $('#tonScore').text(value);
    counter.text(value);
    console.log("value",value)
    clicks = Number(value);
}

if (name !== ""){
   scoreRef.on('value', updateUser);
}


// $('#taPosition') 
// $('#tonScore')

function eventSave(currName){
    let nameUnique=true;
    for(let user of users){
        if(currName === user.username){
            nameUnique=false;
        }
    }
    if(currName !== "" && nameUnique===true){
        name = currName;
        $('#firstStep input').css('display', 'none')
        $('#saveButton').css('display', 'none') 
        $('#yourPos').css('display', 'inline-block') 
        $('#icon').css('display', 'none')
        $('#tonUsername').text(name)
        localStorage.setItem("username", name)
        firebase.database().ref('/clicks/'+name ).on('value', updateUser); 
    }else{
        alert('This name is already taken')
    }
}


function saveUsername(){
    eventSave($('input[name=username]').val());
}
$(document).on("keypress", function (e) { 
    if (e.keyCode == 13) {
    e.preventDefault();
    saveUsername()
    }
});// sauve le username quand on clique sur la touche enter
$('#saveButton').click(saveUsername); // sauve le username quand on clique sur save
$('#firstStep input').focus()






// Stocker les meilleurs dans le leaderboard
// Afficher sa propre position
// Partie se sauve et on peut reprendre quand on revient sur le site (cookie)
// nom valide