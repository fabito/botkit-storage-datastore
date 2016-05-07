var gcloud = require('gcloud');

/**
 * The Botkit google cloud datastore driver
 *
 * @param {Object} config This must contain a `projectId` property
 * @returns {{teams: {get, save, all}, channels: {get, save, all}, users: {get, save, all}}}
 */
module.exports = function(config) {

    if (!config || !config.projectId) {
        throw new Error('projectId is required.');
    }

    var datastore = gcloud.datastore(config),
        teamKind = 'Team',
        channelKind = 'Channel',
        userKind = 'User';

    return {
        teams: {
            get: get(datastore, teamKind),
            save: save(datastore, teamKind),
            all: all(datastore, teamKind)
        },
        channels: {
            get: get(datastore, channelKind),
            save: save(datastore, channelKind),
            all: all(datastore, channelKind)
        },
        users: {
            get: get(datastore, userKind),
            save: save(datastore, userKind),
            all: all(datastore, userKind)
        }
    };
};

/**
 * Given a datastore reference and a kind, will return a function that will get a single entity by key
 *
 * @param {Object} datastore A reference to the datastore Object
 * @param {String} kind The entity kind
 * @returns {Function} The get function
 */
function get(datastore, kind) {
    return function(id, cb) {
        var key = datastore.key([kind, id]);
        datastore.get(key, function(err, entity) {
            cb(err, entity.data);
        });
    };
}

/**
 * Given a datastore reference and a kind, will return a function that will save an entity. The object must have an id property
 *
 * @param {Object} datastore A reference to the datastore Object
 * @param {String} kind The entity kind
 * @returns {Function} The save function
 */
function save(datastore, kind) {
    return function(data, cb) {
        var key = datastore.key([kind, data.id]);
        datastore.save({
          key: key,
          data: data
        }, function(err, resp){
            cb(err, resp)
        });
    };
}

/**
 * Given a datastore reference and a kind, will return a function that will return all stored entities.
 *
 * @param {Object} datastore A reference to the datastore Object
 * @param {String} kind The entity kind
 * @returns {Function} The all function
 */
function all(datastore, kind) {
    return function(cb) {
        var query = datastore.createQuery(kind);

        datastore.runQuery(query, function(err, entities) {

            if(err) {
                return cb(err, null);
            }

            if (!entities) {
                return cb(null, []);
            }

            var list = entities.map(function(entity) {
                return entity.data;
            });

            cb(null, list);

        });

    };
}