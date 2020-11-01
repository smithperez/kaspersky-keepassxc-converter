const _ = require('lodash');
const fs = require('fs');

console.log("begin");

const sourceFile = "/Users/ghassantoumie/Downloads/28-05-2020.txt";
const rawText = fs.readFileSync(sourceFile, "utf-8");
const order = {
    "Group": 0,
    "Title": 1,
    "Username": 2,
    "Password": 3,
    "URL": 4,
    "Notes": 5,
}
const map = {
    "Website name": "Title",
    "Application": "Title",
    "Website URL": "URL",
    "Login": "Username",
    "Password": "Password",
    "Comment": "Notes",
};
let outputArray = [];
const headerArray = ["Group","Title","Username","Password","URL","Notes"];
outputArray.push(headerArray);
const inputArray = rawText.split("\n");
let outLineArray = Array();

for(let i=0;i< inputArray.length ; i++){
    let lineText = inputArray[i];
    if (_.isMatch(lineText, "---")){
        outLineArray[0] = "Database";
        if (outLineArray.length == 6)
            outputArray.push(outLineArray);
        outLineArray = Array();
    }
    let inLineArray = lineText.split(/:(.+)/);
    if (!_.isNil(inLineArray) && inLineArray.length >= 2){
        let inKey = inLineArray[0];
        let inVal = inLineArray[1];
        if (!_.isNil(map[inKey])){
            let outKey = map[inKey];
            let outVal = inVal;
            if(!_.isNil(order[outKey])){
                let ord = order[outKey];
                outLineArray[ord] = outVal.trim();
            }
        }
    }
}


let outRawText = "";
for(let i=0;i<outputArray.length;i++){
    outRawText += outputArray[i].join(", ");
    outRawText +="\n";
}
fs.writeFileSync(__dirname + "/output.csv",outRawText);
console.log("end");