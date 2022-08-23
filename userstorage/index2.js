const aws = require('aws-sdk');
const s3 = new aws.S3;
const dynamodb = new aws.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    try{
    const params = {
        TableName : process.env.UserTable,
        Key:{
            email_id : event.queryStringParameters.email_id
        }
    };
    
    const response = await dynamodb.get(params).promise();
    console.log("info",response);
    
    dynamodb.describeLimits;
    
    let listparams = {
          Bucket: process.env.BucketName, 
        
    };
    
    let listres = await s3.listObjects(listparams).promise();
    console.log("objects list",listres);
    
    
    let s3params={ 
          Body:event.body,  
          Bucket: process.env.BucketName + response.Item.Path,  
          Key: event.queryStringParameters.Key
    };
    let s3res = await s3.putObject(s3params).promise();
    return {
        statusCode : 200,
        body:JSON.stringify({
            "message": true,
            "data":s3res
        })
        
    };
    }
    catch(err){
        console.log(err);
        return {
        statusCode : 400,
        body:JSON.stringify({
            "message": false,
            "data": "Please check if email_id is registered or the key parameter is provided "
        })
    };
    }
};
