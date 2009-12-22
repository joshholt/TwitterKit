// ==========================================================================
// Project:   TwitterKit.TwitterKitDataSource
// ==========================================================================
/*globals TwitterKit unescape*/

/** @class

  The TwitterKit DataSource...
  *** NOTE ***
    Currently only supports Twitter's Search API

  @extends SC.DataSource
  @author Joshua Holt
*/

sc_require('models/tweet');
TwitterKit.TWEETS_QUERY = SC.Query.local(TwitterKit.Tweet, 
  { orderBy: 'id DESC', url: 'search.json?rpp=10&q=twitter' });

TwitterKit.TwitterKitDataSource = SC.DataSource.extend(
/** @scope TwitterKit.TwitterKitDataSource.prototype */ {

  // ..........................................................
  // QUERY SUPPORT
  // 

  fetch: function(store, query) {
    var url = query.get('url');
    // if (query === Twitapp.TWEETS_QUERY &&url) {
    if (url) {
      SC.Request.getUrl(url).json()
            .notify(this, 'didFetchTweets', store, query)
            .send();
          return YES;
    }
    return NO;
  },
  
  didFetchTweets: function(response, store, query) {
    if (SC.ok(response)) {
      var recs = response.get('body').results;
      if (recs) {
        for (var i=0; i < recs.length; i++) {
          recs[i].guid = recs.length - i;
          recs[i].searchTerm = unescape(response.get('body').query);
          recs[i].text = recs[i].text.unescapeHTML();
        }
        store.loadRecords(TwitterKit.Tweet, recs);
        store.dataSourceDidFetchQuery(query);
      } else {
        store.dataSourceDidErrorQuery(query, response);
      }
    } else store.dataSourceDidErrorQuery(query, response);
  },

  // ..........................................................
  // RECORD SUPPORT
  // 
  
  retrieveRecord: function(store, storeKey) {
    
    // TODO: Add handlers to retrieve an individual record's contents
    // call store.dataSourceDidComplete(storeKey) when done.
    
    return NO;
  },
  
  createRecord: function(store, storeKey) {
    var newId = store.find(TwitterKit.Search).length();
    var datahash = store.readEditableDataHash(storeKey);
    datahash.guid = newId + 1;
    store.dataSourceDidComplete(storeKey,null,newId + 1);
    return YES;
  },
  
  updateRecord: function(store, storeKey) {
    
    // TODO: Add handlers to submit modified record to the data source
    // call store.dataSourceDidComplete(storeKey) when done.

    return NO;
  },
  
  destroyRecord: function(store, storeKey) {
    
    // TODO: Add handlers to destroy records on the data source.
    // call store.dataSourceDidDestroy(storeKey) when done
    
    return NO;
  }
  
});

// Initialize the TwitterKit Store with the TwitterKit DataSource.
TwitterKit.initializeStore(TwitterKit.TwitterKitDataSource.create());

// Initialize the TwitterKit User Defaults
TwitterKit.initializeUserDefaults();
