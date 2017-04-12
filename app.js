var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

mongoose.Promise = require('bluebird');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  
  var kittySchema = mongoose.Schema({
    name: String
  });

  // NOTE: methods must be added to the schema before compiling it with mongoose.model()
  kittySchema.methods.speak = function () {
	var greeting = this.name ? "Meow name is " + this.name : "I don't have a name";
	console.log(greeting);
  }
 
  var Kitten = mongoose.model('Kitten', kittySchema);
  
  var silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'
  silence.speak();
  
  var fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"
  
  /*
  silence.save(function (err, silence) {
	if (err) return console.error(err);
    silence.speak();
  });
  */
  
  /*
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })
  */
  
  Kitten.find({ name: /^fluff/ }, function (err, fluff) {
    if (err) return console.error(err);
    console.log(fluff);
  });
  
});