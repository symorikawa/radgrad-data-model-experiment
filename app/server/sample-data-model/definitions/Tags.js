defineTags = function() {

  let sampleTags = [
    {
      name: "Software Engineering",
      slug: "software-engineering",
      description: "The systematic application of scientific and technological knowledge, methods, and experience to the design, implementation, testing, and documentation of software",
      tagType: "cs-disciplines"
    },
    {
      name: "Psychology",
      slug: "psychology",
      description: "The scientific study of the human mind and its functions, especially those affecting behavior in a given context",
      tagType: "non-cs-disciplines"
    },
    {
      name: "Silicon Valley",
      slug: "silicon-valley",
      description: "the southern portion of the San Francisco Bay Area, centering on the Santa Clara valley.",
      tagType: "locations"
    },
    {
      name: "Data Scientist",
      slug: "data-scientist",
      description: "Combine statistics, data mining, and predictive analytics to gain insight from large data sets.",
      tagType: "professional-goals"
    }
  ];

  _.each(sampleTags, RadGrad.tag.define);
};