defineCourses = function() {
  let sampleCourses = [
    {
      name: "Program Structure",
      slug: "ics212",
      number: "ICS 212",
      description: "Program organization paradigms, programming environments, implementation of a module from specifications, the C and C++ programming languages.",
      tags: ["software-engineering"]
    },
    {
      name: "Algorithms",
      slug: "ics311",
      number: "ICS 311",
      description: "Design and correctness of algorithms, including divide-and-conquer, greedy and dynamic programming methods.",
      tags: ["software-engineering", "silicon-valley"]
    }
  ];

  _.each(sampleCourses, RadGrad.course.define);
};
