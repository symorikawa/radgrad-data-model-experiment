Template.ListData.helpers({

  /**
   * @returns {[doc]} A (non-reactive) array of objects containing user info.
   */
  userList: function () {
    return _.map(RadGrad.user.find({}, {sort: {lastName: 1}}).fetch(), function(user) {
      // Required fields
      let name = `**${user.firstName} ${user.middleName} ${user.lastName}** `;
      let roles = `(${user.roles}) `;
      let slug = `*Slug:* ${RadGrad.slug.findBySlug(user.slugID).name} `;
      let email = `*Email:* ${RadGrad.user.getEmail(user._id)} `;
      // Optional fields
      let aboutMe = (_.isEmpty(user.aboutMe)) ? "" : `<br>*About me:* ${user.aboutMe} `;
      let degreeGoalNames = _.map(user.degreeGoalIDs, function(degreeGoalID) {
        return RadGrad.degreegoal.findOne(degreeGoalID).name;
      }) ;
      let degreeGoals = (_.isEmpty(degreeGoalNames)) ? "" : `<br>*Degree Goals*: ${degreeGoalNames}`;
      let tagNames = RadGrad.tag.getTagNames(user.interestTagIDs);
      let tags = (_.isEmpty(tagNames)) ? "" : `<br>*Tags:* ${tagNames} `;
      let degreePlanString = (user.degreePlanID) ? RadGrad.degreeplan.toString(user.degreePlanID) : "";
      let degreePlan = (_.isEmpty(degreePlanString)) ? "" : `<br>*Degree Plan:* ${degreePlanString} `;
      let gradSemester = (_.isEmpty(user.semesterID)) ? "" : `<br>*Graduation:* ${RadGrad.semester.toString(user.semesterID)}`;

      return { picture: user.picture,
        description: name + roles + '<br>' + slug + email + degreeGoals + aboutMe + tags + degreePlan + gradSemester};
    })
  },

  /**
   * @returns {[doc]} Non-reactive array of course info.
   */
  courseList: function() {
    return _.map(RadGrad.course.find().fetch(), function(course) {
      let name = `**(${course.name})**`;
      let number = ` **${course.number}** `;
      let slugName = `<br>*Slug:* ${RadGrad.slug.findBySlug(course.slugID).name}`;
      let tagNames = `<br>*Tags:* ${RadGrad.tag.getTagNames(course.tagIDs)}`;
      let description = `<br>*Description:* ${course.description}`;
      return {description: number + name + slugName + tagNames + description}
    })
  },

  courseInstanceList: function() {
    return _.map(RadGrad.courseinstance.find().fetch(), function(courseInstance) {
      let semester = `${RadGrad.semester.toString(courseInstance.semesterID)}`;
      let course = `${RadGrad.course.findOne(courseInstance.courseID).name}`;
      let verified = `${courseInstance.verified}`;
      let grade = `${courseInstance.grade}`;
      let student = `${RadGrad.user.findOne(courseInstance.studentID).lastName}`;
      let note = courseInstance.note;
      return {semester: semester, course: course, verified: verified, grade: grade, student: student, note: note}
    })
  },

  degreeGoalList: function() {
    return _.map(RadGrad.degreegoal.find().fetch(), function(degreeGoal) {
      let name = `${degreeGoal.name}`;
      let description = `${degreeGoal.description}`;
      let slugName = `${RadGrad.slug.findBySlug(degreeGoal.slugID).name}`;
      return {name: name, slugName: slugName, description: description}
    })
  },

  degreePlanList: function() {
    return _.map(RadGrad.degreeplan.find().fetch(), function(degreePlan) {
      let courseInstances = _.map(degreePlan.courseInstanceIDs, function(courseInstanceID) {
        return RadGrad.courseinstance.toString(courseInstanceID) + " ";
      });
      let courseInstanceString = `*Course Instances:* ${courseInstances}`;

      let opportunityInstances = _.map(degreePlan.opportunityInstanceIDs, function(opportunityInstanceID) {
        return RadGrad.opportunityinstance.toString(opportunityInstanceID) + " ";
      });
      let opportunityInstanceString = `<br>*Opportunity Instances:* ${opportunityInstances}`;

      let workInstances = _.map(degreePlan.workInstanceIDs, function(workInstanceID) {
        return RadGrad.workinstance.toString(workInstanceID) + " ";
      });
      let workInstanceString = `<br>*Work Instances:* ${workInstances}`;
      let student = `<br>*Student:* ${RadGrad.user.findOne(degreePlan.studentID).lastName}`;
      
      return {description: courseInstanceString + opportunityInstanceString + workInstanceString + student}
    })
  },

  /**
   * @returns {[doc]} A (non-reactive) array of objects containing opportunity info.
   */
  opportunityList: function () {
    return _.map(RadGrad.opportunity.find().fetch(), function(opportunity) {
      // Required fields
      let name = `*Name:* ${opportunity.name}, `;
      let slug = `*Slug:* ${RadGrad.slug.findBySlug(opportunity.slugID).name}, `;
      let opportunityType = `*Type:* ${RadGrad.opportunitytype.findOne(opportunity.opportunityTypeID).name}, `;
      let sponsor = `*Sponsor:* ${RadGrad.user.findOne(opportunity.sponsorID).lastName}`;
      let tags = `<br>*Tags:* ${RadGrad.tag.getTagNames(opportunity.tagIDs)}`;
      let description = `<br>*Description:* ${opportunity.description}`;
      let start = moment(opportunity.startActive).format('MM/DD/YYYY');
      let end = moment(opportunity.endActive).format('MM/DD/YYYY');
      let activeInterval = `<br>*Active Interval:* ${start} - ${end}`;

      return { iconURL: opportunity.iconURL,
        description: name + slug + opportunityType + sponsor + tags + description + activeInterval};
    })
  },

  opportunityInstanceList: function() {
    return _.map(RadGrad.opportunityinstance.find().fetch(), function(opportunityInstance) {
      let semester = `${RadGrad.semester.toString(opportunityInstance.semesterID)}`;
      let opportunity = `${RadGrad.opportunity.findOne(opportunityInstance.opportunityID).name}`;
      let verified = `${opportunityInstance.verified}`;
      let hrswk = `${opportunityInstance.hrswk}`;
      let student = `${RadGrad.user.findOne(opportunityInstance.studentID).lastName}`;
      return {semester: semester, opportunity: opportunity, verified: verified, hrswk: hrswk, student: student}
    })
  },

  /**
   * @returns {[doc]} A (non-reactive) array of objects containing opportunity info.
   */
  opportunityTypeList: function () {
    return _.map(RadGrad.opportunitytype.find().fetch(), function(opportunityType) {
      let name = `${opportunityType.name}`;
      let slug = `${RadGrad.slug.findBySlug(opportunityType.slugID).name} `;
      let description = `${opportunityType.description}`;
      return {name: name, slug: slug, description: description };
    })
  },

  /**
   * @returns {[doc]} A (non-reactive) array of objects containing opportunity info.
   */
  slugList: function () {
    return _.map(RadGrad.slug.find().fetch(), function(slug) {
      let name = `${slug.name}`;
      let entityName = `${slug.entityName} `;
      return {name: name, entityName: entityName};
    })
  },

  /**
   * @returns {[doc]} A (non-reactive) array of objects containing opportunity info.
   */
  tagList: function () {
    return _.map(RadGrad.tag.find().fetch(), function(tag) {
      let name = `${tag.name}`;
      let slug = `${RadGrad.slug.findBySlug(tag.slugID).name} `;
      let description = `${tag.description}`;
      let tagType = `${RadGrad.tagtype.findOne(tag.tagTypeID).name} `;
      return {name: name, slug: slug, description: description, tagType: tagType};
    })
  },

  /**
   * @returns {[doc]} A (non-reactive) array of objects containing tag info.
   */
  tagTypeList: function () {
    return _.map(RadGrad.tagtype.find().fetch(), function(tagType) {
      let name = `${tagType.name}`;
      let slug = `${RadGrad.slug.findBySlug(tagType.slugID).name} `;
      let description = `${tagType.description}`;
      return {name: name, slug: slug, description: description };
    })
  },

  workInstanceList: function() {
    return _.map(RadGrad.workinstance.find().fetch(), function(workInstance) {
      let semester = `${RadGrad.semester.toString(workInstance.semesterID)}`;
      let hrswk = `${workInstance.hrswk}`;
      let student = `${RadGrad.user.findOne(workInstance.studentID).lastName}`;
      return {semester: semester, hrswk: hrswk, student: student}
    })
  }


});

