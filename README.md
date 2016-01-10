# RadGrad Data Model Example

This application demonstrates:

* How to load the radgrad:lib and radgrad:core packages, which provide all third party packages and the RadGrad data model.

* How to programmatically define instances of all the entities in the RadGrad data model provided by the radgrad:core package, as well as the relationships between them.

* How to manipulate RadGrad data by a client. This is demonstrated by simply displaying data in tables.  Note that the amount of data displayed for each entity depends upon the role of the logged in user. Currently, the entire data model is published to users with the role 'admin' or 'faculty'.  For a student, only their own data is published to the client for the following entities: users, degree program, course instances, opportunity instances, and work instances.

## Invocation

To run this application, first [install Meteor](https://www.meteor.com/install).

Next, download the repository, cd to the app/ directory, and invoke `meteor`.  If everything goes correctly, then [http://localhost:3000](http://localhost:3000) will display the following:

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data-model-home-page.png?token=AARt8EPSG6BJ5ELPKVBSD5yDysfgh239ks5WmvfRwA%3D%3D)

You'll now need to login. Since this is sample data, you can find user definitions and credentials in [app/server/sample-data-model/definitions/Users.js](https://github.com/radgrad/data-model-example/blob/master/app/server/sample-data-model/definitions/Users.js). Upon login, the home page will display whatever aspects of the RadGrad data model are accessible to this user. Here is a portion of the home page for one user:

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-users.png?token=AARt8D2l8jaqrC2EKIZT9vHpGVtGYLnZks5WmvuOwA%3D%3D)

By studying how the RadGrad data model is displayed to these tables, you will hopefully gain insight into how to manipulate the data model. 

## Loading the sample data set

Upon startup, a sample data set is loaded. This data set is defined by the files in the [app/server/sample-data-model/definitions](https://github.com/radgrad/data-model-example/tree/master/app/server/sample-data-model/definitions) directory. Each of these files defines a function, which, when invoked, actually defines the data. The invocation of these data-defining functions occurs in [app/server/sample-data-model/LoadDataModel.js](https://github.com/radgrad/data-model-example/blob/master/app/server/sample-data-model/LoadDataModel.js), which looks like this:

```js
// Before loading sample data model, delete all pre-existing data.
RadGrad.deleteAll();
RadGrad.verifyEmptyDataModel();

// See the definitions/ directory for the definitions of these functions.
// Order of invocation of the following functions is sometimes important.
// For example, Tag definitions refer to TagTypes, so TagTypes must be defined first.

defineOpportunityTypes();
defineTagTypes();
defineTags();
defineSemesters();
defineUsers();
defineOpportunities();
defineCourses();
defineDegreeGoals();
defineStudentProfile();
```

Several things to note:

1. Meteor loads files in a depth-first fashion.  Because the files defining these functions are all located in a subdirectory of the directory where `LoadDataModel.js` is located, Meteor will guarantee that these functions are defined before they are invoked here.

2. The order in which entities are defined is important, because there are relationships between entities, and so one entity must be defined before another entity can refer to it. For example, a Tag must be defined with a reference to its TagType, so all of the TagTypes are defined prior to any of the Tags in order to guarantee that a Tag can always find its associated TagType definition.

3. To support testing, the system implements a deleteAll() method which should delete all entities, as well as a verifyEmptyDataModel() method to check that no RadGrad entity instances exist.

## User interface

The user interface for data-model-example is extremely simple. Upon login, the home page displays all of the published data associated with all of the entities in the RadGrad data model as implemented by radgrad:core.  The following sections show examples of how each part of the data model is displayed in the home page.

### Users

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-users.png?token=AARt8D2l8jaqrC2EKIZT9vHpGVtGYLnZks5WmvuOwA%3D%3D)

RadGrad users come in three roles: admin, faculty, and student. Currently, there is no distinction between the admin and faculty roles, and the system publishes the entire data model to those users.  For users, however, the system restricts the publications so that a user can not see details about any other user's degree program (i.e. their instances of courses, opportunities, and work), or their degree plan.



The [User template](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.html#L4-16) is pretty trivial, although it is interesting as an illustration of how simple it is in Meteor to render markdown.  You can see that one of the students has [a link represented in Markdown in their profile](https://github.com/radgrad/data-model-example/blob/master/app/server/sample-data-model/definitions/StudentProfile.js#L43), which is converted to HTML in the interface. 

The [definition of a student](https://github.com/radgrad/data-model-example/blob/master/app/server/sample-data-model/definitions/StudentProfile.js) also provides several illustrations of how entities and relationships between them are defined in RadGrad. 

For example, many entities are defined with a "slug", which is essentially a human-readable, unique ID that can be used to programmatically retrieve that entity through various findBySlug() methods implemented in the API. The definition of the student shows several uses of findBySlug() methods in order to retrieve previously defined entities and link them to this student profile.
 
The definition of the User entity is found in the [RadGrad:core package, User.js](https://github.com/radgrad/core/blob/master/app/packages/radgrad-core/lib/data-model/User.js).

### Degree Plans and Degree Goals

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-degree-plans-goals.png)

All students have either zero or one Degree Plan entities, which represents all of the courses they have taken (their course instances), the opportunities they have taken advantage of (opportunity instances), and their outside work (work instances). You can see that this screen image shows the degree plan for the hypothetical user Anthony Christe.  In this sample data set, there is only one defined degree plan instance. (The other student in the sample data set, "Sergey Negrashov", does not yet have a degree plan instance.) If you logged in as Sergey Negrashov, you would not be able to see the Degree Plan instance associated with Anthony Christe.

All students can also associate themselves with one or more Degree Goals, which (when fully implemented) will enable the system to analyze a student's degree plan and make recommendations based upon their chosen Degree Goals. Currently, this recommendation mechanism is not implemented.









