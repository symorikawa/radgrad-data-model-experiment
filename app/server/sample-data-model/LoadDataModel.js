
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