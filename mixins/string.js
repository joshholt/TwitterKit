/*globals TwitterKit*/

/** @mixin

  This mixin provides the ability to unescapse HTML strings,
  it supplements The Builtin String Object.
  
  @author Josh Holt
*/

TwitterKit.String = {
  
  stripTags: function() {
    return this.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
  },
  
  unescapeHTML: function () {
    return this.stripTags().replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'\"');
  }
  
};

// Apply Twitapp.String mixin to built-in String object
SC.supplement(String.prototype, TwitterKit.String);
