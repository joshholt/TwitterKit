// ==========================================================================
// Project:   TwitterKit.tweetsController
// ==========================================================================
/*globals TwitterKit */

/** @class

  This Array Controller provides an array of Tweets

  @extends SC.ArrayController
*/
TwitterKit.tweetsController = SC.ArrayController.create(
/** @scope TwitterKit.tweetsController.prototype */ {

  contentBinding: 'TwitterKit.searchController.tweets',
  
  selectionDidChange: function() {
    // TODO Implement unread count decrement.
  }.observes('selection')

});
