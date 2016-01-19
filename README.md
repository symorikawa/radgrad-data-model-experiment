# RadGrad Data Model Example

This application demonstrates:

* How to load the radgrad:lib and radgrad:core packages, which provide all third party packages and the RadGrad data model.

* How to programmatically define instances of all the entities in the RadGrad data model provided by the radgrad:core package, as well as the relationships between them.

* How to manipulate RadGrad data by a client. This is demonstrated by displaying the data model through a series of tables. Note that the specific data published and displayed for each entity depends upon the role of the logged in user. Currently, the entire data model is published to users with the role 'admin' or 'faculty'.  For a student, only their own data is published to the client for the following entities: users, degree program, course instances, opportunity instances, and work instances.

## Screencast

Click the image below to watch a 24 minute walkthrough of this system. (I apologize for forgetting to reduce the size of my camera window in the video!) 

[<img src="https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/data-model-example-youtube.png" width="600">](https://www.youtube.com/watch?v=-r41LRsuf-4)


## Invocation

To run this application, first [install Meteor](https://www.meteor.com/install).

Next, download the repository, cd to the app/ directory, and invoke `meteor`.  If everything goes correctly, then [http://localhost:3000](http://localhost:3000) will display the following:

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data-model-home-page.png)

You'll now need to login. Since this is sample data, you can find user definitions and credentials in [app/server/sample-data-model/definitions/Users.js](https://github.com/radgrad/data-model-example/blob/master/app/server/sample-data-model/definitions/Users.js). Upon login, the home page will display whatever aspects of the RadGrad data model are accessible to this user. Here is a portion of the home page for the user "Philip Johnson". 

*Note: for exemplary purposes, user names refer to actual faculty and graduate students in the ICS department, and their email addresses are correct, but otherwise all of the data for these users are made up.*

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-users.png)

By studying how the RadGrad data model is manipulated in this application, you will hopefully gain insight into how to manipulate the data model for your own purposes.  

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

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-users.png)

RadGrad users come in three roles: admin, faculty, and student. Currently, there is no distinction between the admin and faculty roles, and the system publishes the entire data model to those users.  For students, however, the system publishes only a subset of the data so that a user can not see details about any other student's degree program data (i.e. their degree plan, work instances, course instances, opportunity instances, recommendations, or predictions).



The [User template](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.html#L4-L16) is pretty trivial, although it is interesting as an illustration of how simple it is in Meteor to render markdown.  You can see that one of the students has [a link represented in Markdown in their profile](https://github.com/radgrad/data-model-example/blob/master/app/server/sample-data-model/definitions/StudentProfile.js#L43), which is converted to HTML in the interface. 

This template is populated via the [ListData userList helper method](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.js#L6-L28). 

The [definition of a student](https://github.com/radgrad/data-model-example/blob/master/app/server/sample-data-model/definitions/StudentProfile.js) also provides several illustrations of how entities and relationships between them are defined in RadGrad. 

For example, many entities are defined with a "slug", which is essentially a human-readable, unique ID that can be used to programmatically retrieve that entity through various findBySlug() methods implemented in the API. The definition of the student shows several uses of findBySlug() methods in order to retrieve previously defined entities and link them to this student profile.
 
The definition of the User entity is found in the [RadGrad:core package, User.js](https://github.com/radgrad/core/blob/master/app/packages/radgrad-core/lib/data-model/User.js).

### Degree Plans and Degree Goals

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-degree-plans-goals.png)

All students have either zero or one Degree Plan entities, which represents all of the courses they have taken (their course instances), the opportunities they have taken advantage of (opportunity instances), and their outside work (work instances). You can see that this screen image shows the degree plan for the hypothetical user Anthony Christe.  In this sample data set, there is only one defined degree plan instance. (The other student in the sample data set, "Sergey Negrashov", does not yet have a degree plan instance.) If you logged in as Sergey Negrashov, you would not be able to see the Degree Plan instance associated with Anthony Christe.

All students can also associate themselves with one or more Degree Goals, which (when fully implemented) will enable the system to analyze a student's degree plan and make recommendations based upon their chosen Degree Goals. Currently, this recommendation mechanism is not implemented.

Implementation links:

  * [Degree Plans Template](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.html#L20-L31) 
  * [Degree Plans Helper Function](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.js#L64-L84).
  * [Degree Goals Template](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.html#L33-L51)
  * [Degree Goals Helper Function](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.js#L55-L62)
  
### Tags and Tag Types

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-tags-tag-types.png)

In addition to specifying Degree Goals, a user can specify one or more RadGrad Tags, which define interest areas.  Since "interests" can span so many different types of things, RadGrad provides a "TagType" entity in order to organize Tags into related groups. The sample data set defines four kinds of Tags: CS Disciplines, Non-CS Disciplines, Locations, and Professional Goals. The real RadGrad data model will likely have many more 
 
The data model defines a single instance of a Tag for each TagType. 

Implementation links:

  * [Tag Template](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.html#L73-L93)
  * [Tag helper function](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.js#L138-L149)
  * [Tag Type Template](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.html#L53-L71)
  * [Tag type helper function](https://github.com/radgrad/data-model-example/blob/master/app/client/templates/home/ListData.js#L151-L161)
  
## Course, Course instances

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-course-instances.png)

*Note: Course Instance data is made up.*

RadGrad provides the Course and Course Instance entities to enable the system to explicitly represent and reason about the ICS courses taken by students.  

The Course entity provides information about courses in general, while the Course Instance entity represents that a specific user took a specific course in a specific semester. 

Note that a user is free to indicate course instances for semesters into the future, and even indicate the grade they hope to obtain for that course.  However, the "verified" flag is used to tell the system that the data has been independently verified as accurate. In practice, RadGrad will create historical course instance data by importing records from STAR through an administrator interface, which will help guarantee that historical course data is accurate. 

(From now on, you are expected to be able to find the implementation links for template and helper functions yourself.)
  
### Opportunity, Opportunity Type, Opportunity Instances

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-opportunities-types-instances.png)

*Note: Opportunity Instance data is made up.*

An important aspect of RadGrad is its ability to represent not just curricular activities (courses) but also extracurricular activities (which are called "Opportunities" in RadGrad). 

Like tags, opportunities have an associated "OpportunityType" which allows them to be organized into categories. 
 
Unlike tags, RadGrad provides an "OpportunityInstance", which is an entity that indicates that an opportunity was taken advantage of in a specific semester by a specific student, and (potentially) how many hours per week on average were required to take advantage of that opportunity. Finally, the "instance" must be verified by a faculty or admin user, in order to prevent students from "gaming the system" by indicating opportunities they did not truly engage with.

### Work instances

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-work-instances.png)

*Note: Work Instance data is made up.*

The final "instance" in RadGrad is the Work Instance, which represents for a specific student and a specific semester, the number of hours they worked at an outside job on average each week of the semester.

Unlike Course Instances and Opportunity Instances, there is no practical way to verify Work Instance data, so it is up to the student to report that information accurately.

### Slugs

![](https://raw.githubusercontent.com/radgrad/data-model-example/master/doc/images/sample-data/sample-data-slugs.png)

The last RadGrad entity represented in this system is the Slug.  Slugs are simply strings that form a human-understandable, unique ID for referring to an entity.  (Not all entities have Slugs: none of the "instances" have them.)

Slugs are convenient when defining entities. For example, consider this definition of a Tag:

```js
RadGrad.tag.define({name: "Software Engineering",
                    slug: "software-engineering",
                    description: "TBD",
                    tagType: "cs-disciplines"
                    });
```

The RadGrad.tag.define function allows you to pass the tagType using its Slug, even though the underlying collection stores the actual ID of the underlying TagType document. Passing the TagType's document ID explicitly would require a little more effort.  

There is another reason for slugs: we anticipate that the ultimate RadGrad user interface will want to have pages dedicated to various entities. For example, it is likely to be useful to have a page dedicated to the "Software Engineering" tag, which will provide its definition, the tag type it is part of, and indications of users, opportunities, and courses associated with it.  The slug will simplify the creation of a user-friendly URL, such as:

    http://radgrad.ics.hawaii.edu/tag/software-engineering
    



 
 


  
  








