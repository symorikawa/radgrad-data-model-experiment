
defineTagTypes = function() {
  let sampleTagTypes = [
    {name: "CS Disciplines", slug: "cs-disciplines", description: "Computer science academic areas."},
    {
      name: "Non-CS Disciplines",
      slug: "non-cs-disciplines",
      description: "Academic areas apart from computer science."
    },
    {name: "Locations", slug: "locations", description: "Geographic regions of interest."},
    {name: "Professional goals", slug: "professional-goals", description: "Job titles of interest"}
  ];

  _.each(sampleTagTypes, RadGrad.tagtype.define);
};