// ==========================================================================
// Project:   TwitterKit.searchesController
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals TwitterKit */

/** @class

  This Controller provides an Array of Saved Searches

  @extends SC.ArrayController
*/
TwitterKit.searchesController = SC.ArrayController.create(
/** @scope TwitterKit.searchesController.prototype */ {

  allowsMultipleSelection: NO,
  allowsEmptySelection: NO,
  queryString: null,
  
  search: function() {
    var queryString = this.get('queryString');
    var savedQuerries = this.getEach('searchTerm');
    if (!queryString) return null;
    if (savedQuerries.indexOf(queryString) !== -1) return null;
    var rec = TwitterKit.get('store').createRecord(TwitterKit.Search,
      {searchTerm: queryString, unreadTweetsCount: 10});
    TwitterKit.searchesController.selectObject(rec);
  }

}) ;
