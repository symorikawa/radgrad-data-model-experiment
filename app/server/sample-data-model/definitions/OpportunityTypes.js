
defineOpportunityTypes = function () {
  let sampleOpportunityTypes = [
    {name: "Research", slug: "research", description: "A research project."},
    {name: "Club", slug: "club", description: "A student club related to ICS."},
    {name: "Internship", slug: "internship", description: "An internship related to ICS."},
    {name: "Event", slug: "event", description: "An event related to ICS."}
  ];

  _.each(sampleOpportunityTypes, RadGrad.opportunitytype.define);
};