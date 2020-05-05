// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

var fs = require('fs');
const path = './src/assets/images';
let folders = [];
function getFolders(){
  return new Promise((resolve, reject) => {
    fs.readdir(path, function (err, content) {
      folders = content; 
      if(folders.length = content.length){
        resolve(folders); 
      } 
    })
  })
}

exports.handler = async (event, context) => {
  try {
    return getFolders().then((folders) =>( {
      statusCode: 200,
      body: JSON.stringify({ message: `${folders}` })
    }))
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}  
