const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const scanItems = async (params) => {
	try {
		const res = [];	
		const data = await dynamodb.scan(params).promise();

		res.push(...data.Items);

		if(data.LastEvaluatedKey) {
			params.ExclusiveStartKey = data.LastEvaluatedKey;
			const nextRes = await this.scanItems(params);
      res.push(...nextRes);
		}
		return res;
	} catch(err) {
		throw err;
	}
}

const putItems = (params) => {
	try {
		return dynamodb.put(params).promise()
			.then(data => data);
	} catch(err) {
		throw err;
	}
}

module.exports = {
	scanItems,
	putItems,
	AWS,
	dynamodb
}