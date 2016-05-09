[![Build Status](https://travis-ci.org/fabito/botkit-storage-datastore.svg?branch=master)](https://travis-ci.org/fabito/botkit-storage-datastore)

# botkit-storage-datastore

A Google Cloud Datastore storage module for Botkit

## Usage

Just require `botkit-storage-datastore` and pass it a config with a `projectId` option.
Then pass the returned storage when creating your Botkit controller. Botkit will do the rest.

Make sure everything you store has an `id` property, that's what you'll use to look it up later.

```
var Botkit = require('botkit'),
    datastoreStorage = require('botkit-storage-datastore')({projectId: '...'}),
    controller = Botkit.slackbot({
        storage: datastoreStorage
    });
```

```
// then you can use the Botkit storage api, make sure you have an id property
var beans = {id: 'cool', beans: ['pinto', 'garbanzo']};
controller.storage.teams.save(beans);
beans = controller.storage.teams.get('cool');
```