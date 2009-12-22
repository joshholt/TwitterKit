// ==========================================================================
// Project:   TwitterKit
// ==========================================================================
/*globals TwitterKit */

/** @namespace

  --------------------TwitterKit----------------------------------------------

  What is TwitterKit?

  	TwitterKit is a library intended to be included in the frameworks
  	directory of a SproutCore application.

  Plans:

  	TwitterKit will support Twitter's full and search APIs. Currently
  	only the search API is supported. I plan to support the full Twitter API
  	in the near future.

  Usage:

  	1.) Include the TwitterKit framework as a prerequisite in your Buildfile.
  	2.) Use the TwitterKitDatasource
  	3.) Use the TwitterKit controllers
  	4.) Go Twitter Crazy...
  
  @extends SC.Object
  @author Joshua Holt
*/
TwitterKit = SC.Object.create(
  /** @scope TwitterKit.prototype */ {

  NAMESPACE: 'TwitterKit',
  VERSION: '0.1.0',
  
  
  // The Store for the TwitterKit framework.
  store: null,
  
  /*
    Initializes TwitterKit's store with the given data source.
   
    @param {SC.DataSource} dataSource The data source used to initialize the store.
  */
  initializeStore: function(dataSource) {
    this.set('store', TwitterKit.Store.create().from(dataSource));
  },
  
  /*
    Retrieves a single record from the store.
   
    @param {SC.Record} recordType The type of the record to retrieve.
    @param {String|Number} id The ID of the record to retrieve.
   
    @returns {SC.Record} The instantiated record.
  */
  findRecord: function(recordType, id, params) {
    return this.get('store').find(recordType, id, params);
  },

  /*
    Retrieves all records from the store matching the given query.
   
    @param {SC.Query} q The query to apply.
   
    @returns {SC.RecordArray} A SC.RecordArray of matching records.
  */
  findRecords: function(q) {
    return this.get('store').find(q);
  },

  /*
    Commits dirty records in store.
  */
  commitRecords: function(recordTypes, ids, storeKeys, params) {
    this.get('store').commitRecords(recordTypes, ids, storeKeys, params);
  },
  
  /*
    Initializes TwitterKit's UserDefaults for saved searches.
  */
  initializeUserDefaults: function() {
    var hasUserDefaults = SC.userDefaults.getPath('TwitterKitUserDefaults:savedSearches');
    if (!hasUserDefaults) {
      SC.userDefaults.defaults({
        "TwitterKitUserDefaults:savedSearches": [
          {"searchTerm":"sproutcore","unreadTweetsCount":10,"guid":1}
        ]
      });
    }
    this.loadUserDefaults();
  },
  
  /*
    Loads up the UserDefaults
  */
  loadUserDefaults: function() {
    var json = SC.userDefaults.getPath('TwitterKitUserDefaults:savedSearches');
    var recs = eval(json);
    if (recs) {
      this.get('store').loadRecords(TwitterKit.Search,recs);
      console.log('loaded data from UserDefaults');
      this.startTwitterKit();
    }
  },
  
  /*
    Dumps Records into TwitterKit's UserDefaults
  */
  dumpRecordsToUserDefaults: function() {
    if (!this.get('userDefaults')) return ;
    var recs = this.get('store').find(TwitterKit.Search).invoke('get','attributes');
    var str = SC.json.encode(recs);
    SC.userDefaults.writeDefault('userDefaults.savedSearches',str);
  },
  
  /*
    Starts TwitterKit
  */
  startTwitterKit: function() {
    var searches = this.get('store').find(TwitterKit.SEARCHES_QUERY);
    TwitterKit.searchesController.set('content',searches);
  }

});

TwitterKit.SEARCHES_QUERY = SC.Query.local(TwitterKit.Search, 
  { orderBy: 'searchTerm ASC' });
TwitterKit.Store = SC.Store.extend({});
