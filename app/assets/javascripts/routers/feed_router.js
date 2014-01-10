NewsReader.Routers.FeedRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'feeds/:id': 'showFeed',
    'entries/:id': 'showEntry',
    'users/new': 'newUser',
    'session/new': 'newSession'
  },

  index: function () {
    var feedsView = new NewsReader.Views.FeedsView({ collection: NewsReader.feeds });
    this._swapView(feedsView);
  },

  showFeed: function (id) {
    var that = this;
    var feedModel = new NewsReader.Models.Feed();
    feedModel.id = id
    feedModel.fetch({
      success: function () {
        var feedView = new NewsReader.Views.FeedView({ model: feedModel });
        that._swapView(feedView);
      }
    })
  },

  showEntry: function(id) {
    var that = this;
    var entry = new NewsReader.Models.Entry({id: id})
    entry.fetch({
      success: function() {
        var entryView = new NewsReader.Views.EntryView({
          model: entry
        });
      that._swapView(entryView);
      }
    })
  },

  newUser: function() {
    if($.cookie('session_token')) {
      NewsReader.feedRouter.navigate('', {trigger: true});
    } else {
      var user = new NewsReader.Models.User();
      var newUserView = new NewsReader.Views.NewUserView({ model: user });
      this._swapView(newUserView);
    }
  },

  newSession: function() {
    if($.cookie('session_token')) {
      NewsReader.feedRouter.navigate('', {trigger: true});
    } else {
      var user = new NewsReader.Models.User();
      var newSessionView = new NewsReader.Views.NewSessionView({ model: user });
      this._swapView(newSessionView);
    }
  },

  _swapView: function (newView) {
    this._currentView && this._currentView.remove();
    this._currentView = newView;
    $('#content').html(newView.render().$el)
    var session_token = $.cookie('session_token');
    $('#session_token').html(session_token);
  }
});