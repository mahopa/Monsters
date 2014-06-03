var MyApp = {};
//array to hold monsters
MyApp.Monsters = [];
//Monster Constructor Function
MyApp.Monster = function (name, description, picture) {
    this.name = name;
    this.description = description;
    this.picture = picture;
};
//Writes table of monsters out to page
MyApp.WriteTable = function () { };
//CRUD
//Create Monster
MyApp.CreateMonster = function () { };
//Show info for update
MyApp.ShowUpdateMonster = function () { };
//Save info from update
MyApp.SaveUpdateMonster = function () { };
//Delete Monster
MyApp.DeleteMonster = function () { };
