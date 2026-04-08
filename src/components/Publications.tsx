import "./styles/Publications.css";

const publications = [
  {
    title: "AI driven Chatbot and its Evolution",
    source: "2022 5th International Conference on Advances in Science and Technology (ICAST)",
    date: "December 2, 2022",
    authors:
      "Atharvaa Rane, Chinmay Ranade, Hardik Bandekar, Riva Jadhav, Vidya Chitre",
    pages: "170-173",
    publisher: "IEEE",
    citations: "Cited by 21",
    description:
      "In today's fast-paced world, when humans want everything to be done swiftly and precisely, traditional systems cannot keep up with it, and hence the necessity for chatbots arose. The paper discusses how AI and NLP support chatbot development through pattern matching and reviews text-to-text, text-to-speech, and speech-to-speech chatbot evolution.",
    tags: ["AI", "Chatbots", "NLP", "IEEE", "ICAST 2022"],
  },
];

const Publications = () => {
  return (
    <section className="publications-section" id="publications">
      <div className="publications-container section-container">
        <div className="publications-header">
          <span className="publications-kicker">Research & Writing</span>
          <h2 className="publications-title">
            Publications <span>&amp; Papers</span>
          </h2>
          <p>
            A publication section to show research-facing work alongside the
            production systems, ML pipelines, and deployed AI applications in the
            rest of the portfolio.
          </p>
        </div>

        <div className="publications-grid">
          {publications.map((publication) => (
            <article className="publication-card" key={publication.title}>
              <div className="publication-meta">
                <span className="publication-chip">Publication</span>
                <span className="publication-source">{publication.source}</span>
              </div>
              <h3>{publication.title}</h3>
              <div className="publication-info-grid">
                <div className="publication-info-card publication-info-card-wide">
                  <span>Authors</span>
                  <strong>{publication.authors}</strong>
                </div>
                <div className="publication-info-card">
                  <span>Publication date</span>
                  <strong>{publication.date}</strong>
                </div>
                <div className="publication-info-card">
                  <span>Pages</span>
                  <strong>{publication.pages}</strong>
                </div>
                <div className="publication-info-card">
                  <span>Publisher</span>
                  <strong>{publication.publisher}</strong>
                </div>
                <div className="publication-info-card">
                  <span>Total citations</span>
                  <strong>{publication.citations}</strong>
                </div>
              </div>
              <p>{publication.description}</p>
              <div className="publication-tags">
                {publication.tags.map((tag) => (
                  <span className="publication-tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
