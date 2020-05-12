/* code from functions/todos-create.js */
var faunadb = require('faunadb'); /* Import faunaDB sdk */

/* configure faunaDB Client with our secret */
const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SERVER_SECRET
})

exports.handler = (event, context, callback) => {
 return client.query(
  q.Paginate(
    q.Match(q.Index('names'))
  )
 )
  .then((response) => {  
console.log(response.data) 
return callback(null, {
  statusCode: 200,
  body: JSON.stringify(response)
})
  }).catch((error) => {
    console.log("error", error)
    return callback(null, {
      statusCode: 400,
      body: JSON.stringify(error)
    })
  })
}