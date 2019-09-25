const csvFilePath='items.csv'; 
const csv=require("csvtojson");

// only include merchandise column from .csv file
csv({ includeColumns: /Merchandise/, output:"line"})
.fromFile(csvFilePath)
.then((data)=>{
    var itemCount = {}; 
    var uncategorizedMerch = 0; 
    data.forEach(item => {
        //regex to extract merchandise item subclass
        var regex = /:\s.+/g;
        var hItem = item.match(regex);
        if(hItem !== null ){
            hItem.forEach(element => {
                var subclassUnformatted = element.split(":")[3];
                // increment object with count of items and add new item keys to object 
                if(subclassUnformatted != undefined){
                    // remove extra space in front of string 
                    var subclass = subclassUnformatted.split(' ')[1]; 
                    itemCount[subclass] = (itemCount[subclass]+1) || 1 ;
                }
              
            })
        }
        else{
            // counter for items that do not have a merchandise hierarchy 
                    uncategorizedMerch += 1;
            }
    })
    itemCount['uncategorizedMerch']= uncategorizedMerch; 
    //converting data from objects
    let arr = Array.from(Object.keys(itemCount), k=>[`${k}`, itemCount[k]]);

console.log(arr)

    return arr
})
 
var fs = require('fs');
var result = csv().fromFile(csvFilePath);
 
// write data to file sample.txt
fs.writeFile('sample.txt',result,
    // callback function that is called after writing file is done
    function(err) { 
        if (err) throw err;
        // if no error
        console.log("Data is written to file successfully.")
});