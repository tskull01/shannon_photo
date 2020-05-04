var fs = require('fs'); 
const paths = ['../assets/images/action','../assets/images/combat','../assets/images/environment',
'../assets/images/personal','../assets/images/product']

const results = []; 
exports.handler = async (event, context) => {
for(let path of paths){
    fs.readdir( path, (error, files) => { 
        results.push(files.length); // return the number of files
        console.log(results); // print the total number of files
     });
}

return{statusCode: 200, body:`${results}`};
}
