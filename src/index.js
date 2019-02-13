const {Datastore} = require('@google-cloud/datastore');

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

    var datastore = new Datastore(config),
        namespace = config.namespace,
        teamKind = config.teamKind || 'BotkitTeam',
        channelKind = config.channelKind || 'BotkitChannel',
        userKind = config.userKind || 'BotkitUser';

    return {
        teams: {
            get: get(datastore, teamKind, namespace),
            save: save(datastore, teamKind, namespace),
            all: all(datastore, teamKind, namespace),
            delete: del(datastore, teamKind, namespace)
        },
        channels: {
            get: get(datastore, channelKind, namespace),
            save: save(datastore, channelKind, namespace),
            all: all(datastore, channelKind, namespace),
            delete: del(datastore, channelKind, namespace)
        },
        users: {
            get: get(datastore, userKind, namespace),
            save: save(datastore, userKind, namespace),
            all: all(datastore, userKind, namespace),
            delete: del(datastore, userKind, namespace)
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
function get(datastore, kind, namespace) {
    return function(id, cb) {
        var keyParam = [kind, id];
        if (namespace) {
            keyParam = {
                namespace: namespace,
                path: keyParam
            };
        }
        var key = datastore.key(keyParam);

        datastore.get(key, function(err, entity) {
            if (err)
                return cb(err);

            return cb(null, entity ? entity : null);
        });
    };
};

/**
 * Given a datastore reference and a kind, will return a function that will delete a single entity by key
 *
 * @param {Object} datastore A reference to the datastore Object
 * @param {String} kind The entity kind
 * @returns {Function} The get function
 */
function del(datastore, kind, namespace) {
    return function(id, cb) {
        var keyParam = [kind, id];
        if (namespace) {
            keyParam = {
                namespace: namespace,
                path: keyParam
            };
        }
        var key = datastore.key(keyParam);
        datastore.delete(key, cb);
    };
};

/**
 * Given a datastore reference and a kind, will return a function that will save an entity.
 * The object must have an id property
 *
 * @param {Object} datastore A reference to the datastore Object
 * @param {String} kind The entity kind
 * @returns {Function} The save function
 */
function save(datastore, kind, namespace) {
    return function(data, cb) {
        var keyParam = [kind, data.id];
        if (namespace) {
            keyParam = {
                namespace: namespace,
                path: keyParam
            };
        }
        var key = datastore.key(keyParam);
        datastore.save({key: key, data: data}, cb);
    };
};

/**
 * Given a datastore reference and a kind, will return a function that will return all stored entities.
 *
 * @param {Object} datastore A reference to the datastore Object
 * @param {String} kind The entity kind
 * @returns {Function} The all function
 */
function all(datastore, kind, namespace) {
    return function(cb) {
        var query = null;
        if (namespace) {
            query = datastore.createQuery(namespace, kind);
        } else {
            query = datastore.createQuery(kind);
        }

        datastore.runQuery(query, function(err, entities) {
            if (err)
                return cb(err);

            var list = (entities || []).map(function(entity) {
                return entity;
            });

            cb(null, list);
        });

    };
};
