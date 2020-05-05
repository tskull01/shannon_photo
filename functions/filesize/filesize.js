
var fs = require('fs');

const paths = ['.netlify/large-media/assets/images/action','.netlify/large-media/assets/images/combat','.netlify/large-media/assets/images/environment',
'.netlify/large-media/assets/images/personal','.netlify/large-media/assets/images/product']
let results = []  
let name;
function setResults(){
  let counter = 0;
  //Function returns a promise that contains the length of the files in paths
  return new Promise((resolve, reject)=>{
    for( let path of paths){
      fs.readdir(path, function (err, content) {
         if(err){
           console.log(err)
         }else{
         name = path.split('/').pop(); 
         results[name] = content.length;
         counter++; 
         if(counter > 4){
          resolve(results); 
        }
       }
    })
  }
  })
}
exports.handler = async (event, context) => {  
  try {
    console.log(__dirname)
    console.log(process.cwd())
    console.log(fs.existsSync('dist') && fs.lstatSync('dist').isDirectory())
    console.log(fs.existsSync('assets') && fs.lstatSync('assets').isDirectory())
    console.log(fs.existsSync('src') && fs.lstatSync('src').isDirectory())
    console.log(fs.existsSync('shannon-photo') && fs.lstatSync('shannon-photo').isDirectory())
return setResults().then((results)=>({
   statusCode: 200, body:JSON.stringify({
     'action' : `${results['action']}`,
     'combat' : `${results['combat']}`,
     'environment' : `${results['environment']}`,
     'product' : `${results['product']}`,
     'personal' : `${results['personal']}`
  }) 
})); 
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}
