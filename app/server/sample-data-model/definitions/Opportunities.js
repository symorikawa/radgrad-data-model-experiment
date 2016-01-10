defineOpportunities = function() {
  let sampleOpportunities = [
    {
      name: "ATT Hackathon 2015",
      slug: "hack15",
      description: "Da best",
      opportunityType: "event",
      sponsor: "philipjohnson",
      tags: ["software-engineering"]
    },
    {
      name: "ACM Manoa Membership",
      slug: "acm-manoa",
      description: "ACM Student Chapter",
      opportunityType: "club",
      sponsor: "henricasanova",
      tags: ["software-engineering", "silicon-valley"]
    }
  ];

  _.each(sampleOpportunities, RadGrad.opportunity.define);
};