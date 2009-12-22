// ==========================================================================
// Project:   TwitterKit.searchController
// ==========================================================================
/*globals TwitterKit */
sc_require('mixins/record_status');
/** @class

  This Controller provides access to one saved search.
  
  // ..........................................................
  //  NOTE On Saved Searches
  // 
  
  This controller uses TwitterKit.RecordStatus to Save a search to 
  the SC.UserDefaults for your application.

  @extends SC.ObjectController
*/
TwitterKit.searchController = SC.ObjectController.create(
/** @scope TwitterKit.searchController.prototype */ 
  TwitterKit.RecordStatus, {

  contentBinding: 'TwitterKit.searchesController.selection',
  contentBindingDefault: SC.Binding.single(),
  
  refreshSearch: function() {
    this.get('tweets').refresh();
  },
  
  recordStatusDidChange: function(status) {
    var content = this.get('content');
    if (status & SC.Record.READY_CLEAN) {
      TwitterKit.dumpRecordsToUserDefaults();
    }
  }

}) ;
