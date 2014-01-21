//= require ./content_view
app.views.Comment = app.views.Content.extend({
  templateName: "comment",
  className : "comment media",

  events : function() {
    return _.extend({}, app.views.Content.prototype.events, {
      "click .comment_delete": "destroyModel",
      "click .comment_report": "report"
    });
  },

  initialize : function(options){
    this.templateName = options.templateName || this.templateName
    this.model.on("change", this.render, this)
  },

  presenter : function() {
    return _.extend(this.defaultPresenter(), {
      canRemove: this.canRemove(),
      text : app.helpers.textFormatter(this.model.get("text"), this.model)
    })
  },

  ownComment : function() {
    return app.currentUser.authenticated() && this.model.get("author").diaspora_id == app.currentUser.get("diaspora_id")
  },

  postOwner : function() {
    return  app.currentUser.authenticated() && this.model.get("parent").author.diaspora_id == app.currentUser.get("diaspora_id")
  },

  canRemove : function() {
    return app.currentUser.authenticated() && (this.ownComment() || this.postOwner())
  },

  report: function(evt) {
    if(evt) { evt.preventDefault(); }
    var report = new app.models.Report();
    var msg = report.getReason();
    if (msg !== null) {
      var id = this.model.id;
      var type = $(evt.currentTarget).data("type");
      report.fetch({
        data: { id: id, type: type, text: msg },
        type: 'POST'
      });
    }
  }
});

app.views.ExpandedComment = app.views.Comment.extend({
  postRenderTemplate : function(){
  }
});
