NewsReader.Views.NewSessionView = Backbone.View.extend({
  template: JST['sessions/new'],
  events: {
    'submit #new_session_form': 'createSession'
  },

  render: function() {
    var renderedContent = this.template({ user: this.model });
    this.$el.html(renderedContent);
    return this;
  },

  createSession: function(event) {
    event.preventDefault();
    var formData = $(event.currentTarget).serializeJSON();
    var session = new NewsReader.Models.Sesssion(formData);

    session.save({}, {
      success: function(resp) {
        $.cookie("session_token", resp.get('session_token'));
        console.log(resp)
        NewsReader.feedRouter.navigate("", {trigger: true})
      },

      error: function(resp) {
        console.log("failed")
      }
    });

  }
})