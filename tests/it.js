// jscs:disable

var DatastoreStorage = require('../src');

var storage = new DatastoreStorage({
	projectId: process.env.projectId || 'myproject',
	namespace: '---botkit---'
	//,apiEndpoint: 'http://localhost:8888'
});

var callback = function(err, resp) {
	console.log(err || resp);
};

// storage.teams.save({"id":"ABCD1","createdBy":"XYZ","url":"https://myteam.slack.com/","name":"myteam","incoming_webhook":{"channel":"#random","channel_id":"ASDFASDFAS","configuration_url":"https://myteam.slack.com/services/DFGHJ","url":"https://hooks.slack.com/services/ABCD/DFGHJ/34124231412412","token":"xoxp-4312431241-1241234-12431234-1242134","createdBy":"XYZ"},"bot":{"token":"xoxb-40964182832-lL8r9lBZpDjH2OBGm9yg7HOn","user_id":"ASDFASF","createdBy":"XYZ"},"token":"xoxb-xxxxxxxxxxx"}, callback);
// storage.teams.save({"id":"ABCD2","createdBy":"XYZ","url":"https://myteam.slack.com/","name":"myteam","incoming_webhook":{"channel":"#random","channel_id":"ASDFASDFAS","configuration_url":"https://myteam.slack.com/services/DFGHJ","url":"https://hooks.slack.com/services/ABCD/DFGHJ/34124231412412","token":"xoxp-4312431241-1241234-12431234-1242134","createdBy":"XYZ"},"bot":{"token":"xoxb-xxxxxxxxxxx","user_id":"ASDFASF","createdBy":"XYZ"},"token":"xoxb-xxxxxxxxxxx"}, callback);
// storage.teams.save({"id":"ABCD3","createdBy":"XYZ","url":"https://myteam.slack.com/","name":"myteam","incoming_webhook":{"channel":"#random","channel_id":"ASDFASDFAS","configuration_url":"https://myteam.slack.com/services/DFGHJ","url":"https://hooks.slack.com/services/ABCD/DFGHJ/34124231412412","token":"xoxp-4312431241-1241234-12431234-1242134","createdBy":"XYZ"},"bot":{"token":"xoxb-xxxxxxxxxxx","user_id":"ASDFASF","createdBy":"XYZ"},"token":"xoxb-xxxxxxxxxxx"}, callback);
// storage.teams.save({"id":"ABCD4","createdBy":"XYZ","url":"https://myteam.slack.com/","name":"myteam","incoming_webhook":{"channel":"#random","channel_id":"ASDFASDFAS","configuration_url":"https://myteam.slack.com/services/DFGHJ","url":"https://hooks.slack.com/services/ABCD/DFGHJ/34124231412412","token":"xoxp-4312431241-1241234-12431234-1242134","createdBy":"XYZ"},"bot":{"token":"xoxb-xxxxxxxxxxx","user_id":"ASDFASF","createdBy":"U06FZ0VQS"},"token":"xoxb-xxxxxxxxxxx"}, callback);
// storage.teams.get("ABCD1", callback);

storage.teams.all(callback);