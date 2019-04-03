var MidiParser = require("./dep/midi-parser.js");
var fs = require("fs");

var contents = fs.readFileSync("./Parser/song.mid", 'base64');
var data = MidiParser.parse(contents);

fs.writeFile("./Parser/output.json",JSON.stringify(data), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
}); 