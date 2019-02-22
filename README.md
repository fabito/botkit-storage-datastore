![Build Status](https://img.shields.io/travis/tonymet/botkit-storage-datastore.svg)
[![Coverage Status](https://coveralls.io/repos/github/tonymet/botkit-storage-datastore/badge.svg?branch=master)](https://coveralls.io/github/tonymet/botkit-storage-datastore?branch=master)
![Downloads](https://img.shields.io/npm/dm/botkit-storage-datastore.svg)
![Downloads](https://img.shields.io/npm/dt/botkit-storage-datastore.svg)
![npm version](https://img.shields.io/npm/v/botkit-storage-datastore.svg)
![dependencies](https://img.shields.io/david/tonymet/botkit-storage-datastore.svg)
![dev dependencies](https://img.shields.io/david/dev/tonymet/botkit-storage-datastore.svg)
![License](https://img.shields.io/npm/l/botkit-storage-datastore.svg)
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