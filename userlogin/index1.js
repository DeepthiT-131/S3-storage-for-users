const aws = require('aws-sdk')
const dynamodb = new aws.DynamoDB.DocumentClient();
exports.handler = async (event) => {
const createAccount=async(event)=>{
    try{
    console.log(event)
    var params={
        TableName: process.env.UserTable,
        Item: { 
            "email_id":event.queryStringParameters.email_id,
            "Name":event.queryStringParameters.Name, 
            "Path":`/${event.queryStringParameters.Name}`,
        }
  }
  
    let response = await dynamodb.put(params).promise(); 
            return true
    }
    
    catch(err){
        console.log("[ERROR]",err);
        return{
            statusCode:400,  
            body:JSON.stringify({
                "message":false, 
                "data": " Enter your Name and EmailId "
            })
        }
    }
}

const params1 = {
    TableName : process.env.UserTable
}
let res1 = await dynamodb.scan(params1).promise()
console.log(res1.Count)     
if (res1.Count < 5){
   let response = await createAccount(event);
   console.log(response);
   return {
            statusCode:200,
            body:JSON.stringify({
                "message":response,
                "data":event.queryStringParameters
            })
        };
} 
else {
    return {
        statusCode:400,  
            body:JSON.stringify({
                "message":false,
                "data": "User Limit exceeded"
            })
    }
}
 
}
    
    


