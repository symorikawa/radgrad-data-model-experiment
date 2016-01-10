# data-model-example

This application demonstrates:

* How to load the radgrad:lib and radgrad:core packages, which provide all third party packages and the RadGrad data model.

* How to programmatically define instances of all the entities in the RadGrad data model provided by the radgrad:core package, as well as the relationships between them.

* How to manipulate RadGrad data by a client. This is demonstrated by simply displaying data in tables.  Note that the amount of data displayed for each entity depends upon the role of the logged in user. Currently, the entire data model is published to users with the role 'admin' or 'faculty'.  For a student, only their own data is published to the client for the following entities: users, degree program, course instances, opportunity instances, and work instances.

# Invocation

To run this application, first [install Meteor](https://www.meteor.com/install).

Next, download the repository, cd to the app/ directory, and invoke `meteor`.  If everything goes correctly, then retrieve [http://localhost:3000](http://localhost:3000) in a browser to see the following page:



# Loading sample data

Upon startup, a sample data set is loaded. This data set is found in the [app/server/sample-data-model](
  
# User interface

The user interface for data-model-example is extremely simple. Upon login, the home page displays all of the published data associated with all of the entities in the RadGrad data model as implemented by radgrad:core.  The following sections show what is output 
