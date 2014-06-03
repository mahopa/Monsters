var MyApp = {};
MyApp.Url = "https://domo.firebaseio.com/.json";
//array to hold monsters
MyApp.Monsters = [];
//Monster Constructor Function
MyApp.Monster = function (name, description, picture) {
    this.name = name;
    this.description = description;
    this.picture = picture;
};
//Writes table of monsters out to page
MyApp.WriteTable = function () {
    var holder = "<table class='table table-striped'>";
    for (var i in MyApp.Monsters) {
        holder += "<tr>";
        holder += "<td>" + MyApp.Monsters[i].name + "</td>";
        holder += "<td>" + MyApp.Monsters[i].description + "</td>";
        holder += "<td> URL:" + MyApp.Monsters[i].picture + "</td>";
        holder += "<td>"+
            "<div class='btn btn-warning' onclick='MyApp.ShowUpdateMonster("+i+")'>Edit</div>"+
            "</td>";
        holder += "</tr>";
    }
    holder += "</table>";
    document.getElementById("tableOutput").innerHTML = holder;
};
//CRUD
//Create Monster
MyApp.CreateMonster = function () {
    //pulls values from fields for monster properties
    var name = document.getElementById("Name").value;
    var description = document.getElementById("Description").value;
    var picture = document.getElementById("Picture").value;
    //Instantiates a monster object
    var monster = new MyApp.Monster(name, description, picture);
    //--->Send Monster to Firebase!!!!
    var request = new XMLHttpRequest();
    request.open("POST", MyApp.Url);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            //Pushes monster into array
            MyApp.Monsters.push(monster);
            MyApp.WriteTable();
            document.getElementById("Description").value = "";
            document.getElementById("Name").value = "";
            document.getElementById("Picture").value = "";
        }
        else { console.log(this.response);}
    };
    request.onerror = function () {
        console.log("Com ERR");
    };
    request.send(JSON.stringify(monster));
  
};
//Show info for update
MyApp.ShowUpdateMonster = function (id) {
    var monster = MyApp.Monsters[id];
    document.getElementById("EditName").value = monster.name;
    document.getElementById("EditDescription").value = monster.description;
    document.getElementById("EditPicture").value = monster.picture;
    document.getElementById("EditId").value = id;
    document.getElementById("ModalTitle").innerHTML = "Editing " + monster.name;
    $('#EditModal').modal();
};
//Save info from update
MyApp.SaveUpdateMonster = function () {
    var name = document.getElementById("EditName").value;
    var description = document.getElementById("EditDescription").value;
    var picture = document.getElementById("EditPicture").value;
    var id = document.getElementById("EditId").value;
    MyApp.Monsters[id].name = name;
    MyApp.Monsters[id].description = description;
    MyApp.Monsters[id].picture = picture;
    $('#EditModal').modal('hide');
    MyApp.WriteTable();
};
//Delete Monster
MyApp.DeleteMonster = function () { };

//Get Monsters From the Database
MyApp.GetMonstersDB = function () {
    MyApp.Monsters = [];
    var request = new XMLHttpRequest();
    request.open("GET", MyApp.Url);
    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            for (var m in data) {
                MyApp.Monsters.push(data[m]);
            }
            MyApp.WriteTable();
        }
        else { console.log("Error on Monsters Get: " + this.response); }
    };
    request.onerror = function () { console.log("Comm Error on Monsters GET"); };
    request.send();
};

//Gets all monsters as script loads
MyApp.GetMonstersDB();
