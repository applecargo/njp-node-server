// var sqlite3 = require('sqlite3').verbose();
// var db = new sqlite3.Database(':memory:');

// db.serialize(function() {
//   db.run("CREATE TABLE lorem (info TEXT)");

//   var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (var i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();

//   db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//       console.log(row.id + ": " + row.info);
//   });
// });

// db.close();



// var sqlite3 = require('sqlite3').verbose();
// var file = "hr";
// var db = new sqlite3.Database(file);
// console.log(db)
// db.all("SELECT first_name,last_name FROM employees", function(err, rows) {
//         rows.forEach(function (row) {
//             console.log(row.first_name, row.last_name);
//         })
//     });
// db.close();




// NOTE: sqlite3 is good. below works nice.
// at first part. make a file called abcd and add user 'user' and record some data
// at second part, we can retieve the data!




// var sqlite3 = require('sqlite3').verbose();  
// var db = new sqlite3.Database('abcd');  
  
// db.serialize(function() {  
//   db.run("CREATE TABLE user (id INT, dt TEXT)");  
  
//   var stmt = db.prepare("INSERT INTO user VALUES (?,?)");  
//   for (var i = 0; i < 10; i++) {  
    
//   var d = new Date();  
//   var n = d.toLocaleTimeString();  
//   stmt.run(i, n);  
//   }  
//   stmt.finalize();  
  
//   db.each("SELECT id, dt FROM user", function(err, row) {  
//       console.log("User id : "+row.id, row.dt);  
//   });  
// });  
  
// db.close();  







var sqlite3 = require('sqlite3').verbose();
var file = "abcd";
var db = new sqlite3.Database(file);
console.log(db)
db.all("SELECT id, dt FROM user", function(err, rows) {
        rows.forEach(function (row) {
            console.log(row.id, row.dt);
        })
    });
db.close();

