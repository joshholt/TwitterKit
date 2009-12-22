// ==========================================================================
// Project:   TwitterKit.Tweet
// ==========================================================================
/*globals TwitterKit */

/** @class

  The Tweet Model represents one tweet
  *** NOTE ***
    Currently this implementes all properties from the Search API
  
  @extends SC.Record
  @author Joshua Holt
  @version 0.1
*/
TwitterKit.Tweet = SC.Record.extend(
/** @scope TwitterKit.Tweet.prototype */ {
  
  primaryKey: 'id',
  
  // The user's avatar
  profileImageUrl: SC.Record.attr(String),
  // The user's handle
  fromUser: SC.Record.attr(String),
  // The user's ID
  fromUserId: SC.Record.attr(Number),
  // The recipent's ID
  toUserId: SC.Record.attr(Number),
  // The actual body of the Tweet
  text: SC.Record.attr(String),
  // The language of the Tweet
  isoLanguageCode: SC.Record.attr(String),
  // The Geo Location of the user
  //geoLocation: <not sure yet>
  // The client used to send this Tweet
  source: SC.Record.attr(String),
  // When this Tweet was created
  createdAt: SC.Record.attr(Date)
  
});