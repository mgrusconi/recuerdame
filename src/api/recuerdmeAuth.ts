
export const lambdaHandler = async (event: any, context: any, callback: any) => {
    console.log(`ENVIRONMENT VARIABLES: ${JSON.stringify(process.env)}`)
    console.log(`Event: ${JSON.stringify(event)}`)
    const token = event.headers.authorizationtoken
    console.info({token});
    switch (token) {
        case 'allow':
            console.log('te entra')
            callback(null, generatePolicy('user', 'Allow', event.routeArn));
            break;
        case 'deny':
            console.log('toda')
            callback(null, generatePolicy('user', 'Deny', event.routeArn));
            break;
        case 'unauthorized':
            console.log('por la')
            callback("Unauthorized");   // Return a 401 Unauthorized response
            break;
        default:
            console.log('cola')
            callback(null, generatePolicy('user', 'Deny', event.routeArn)); // Return a 500 Invalid token response
    }
}

// Help function to generate an IAM policy
const generatePolicy = (principalId: any, effect: any, resource: any) => {
    const authResponse: any = {};
    
    authResponse.principalId = principalId;
    if (effect && resource) {
        const policyDocument: any = {};
        const statementOne:any = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    
    authResponse.context = {
        "stringKey": "stringval",
        "numberKey": 123,
        "booleanKey": true
    };
    return authResponse;
}