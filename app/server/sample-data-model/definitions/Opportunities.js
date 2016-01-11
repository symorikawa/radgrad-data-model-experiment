defineOpportunities = function() {
  let sampleOpportunities = [
    {
      name: "ATT Hackathon 2015",
      slug: "hack15",
      description: "Da best",
      opportunityType: "event",
      sponsor: "philipjohnson",
      tags: ["software-engineering"],
      startActive: moment("2015-01-12").toDate(),
      endActive: moment("2015-02-12").toDate()
    },
    {
      name: "ACM Manoa Membership",
      slug: "acm-manoa",
      description: "ACM Student Chapter",
      opportunityType: "club",
      sponsor: "henricasanova",
      tags: ["software-engineering", "silicon-valley"],
      startActive: moment("2015-01-12").toDate(),
      endActive: moment("2016-02-12").toDate()
    }
  ];

  _.each(sampleOpportunities, RadGrad.opportunity.define);
};