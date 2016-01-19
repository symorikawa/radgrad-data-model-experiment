
// Don't normally define semesters in advance of use. Just use RadGrad.semester.getSemester().
defineSemesters = function() {
  RadGrad.semester.get(RadGrad.semester.fall, 2015);
  RadGrad.semester.get(RadGrad.semester.spring, 2016);
}