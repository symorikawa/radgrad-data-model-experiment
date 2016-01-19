Template.Header.helpers({
  /**
   * @returns {String} The current users role, or 'No Role' if not logged in.
   */
  getRole: function() {
    return (Meteor.user()) ? Meteor.user().roles[0] : "No Role";
  }
});