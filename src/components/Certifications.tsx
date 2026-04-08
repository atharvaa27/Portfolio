import "./styles/Certifications.css";

type Credential = {
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
  credentialId?: string;
  credentialUrl?: string;
};

type CredentialTrack = {
  label: string;
  summary: string;
  items: Credential[];
};

const certificationTracks: CredentialTrack[] = [
  {
    label: "Security & AI Systems",
    summary:
      "Recent credentials across security, GenAI foundations, and modern data platform tooling.",
    items: [
      {
        title: "CompTIA Security+",
        issuer: "CompTIA",
        issued: "July 2025",
        credentialUrl:
          "https://www.credly.com/badges/dcafe8d7-717c-4905-8883-a86b0eb5079b/public_url",
      },
      {
        title: "Defensive Security Intro",
        issuer: "TryHackMe",
        issued: "July 2025",
      },
      {
        title: "Generative AI Fundamentals",
        issuer: "Databricks",
        issued: "March 2025",
        expires: "March 2027",
      },
      {
        title: "Hands-On Essentials: Data Warehousing Badge",
        issuer: "Snowflake",
        issued: "February 2025",
      },
    ],
  },
  {
    label: "Data, ML & Python",
    summary:
      "Applied coursework and platform credentials covering analytics, machine learning, and Python foundations.",
    items: [
      {
        title: "Ask Questions to Make Data-Driven Decisions",
        issuer: "Google",
        issued: "February 2025",
      },
      {
        title: "Data Visualization",
        issuer: "Kaggle",
        issued: "August 2024",
      },
      {
        title:
          "Deep Learning with Python and Keras: Build a Model for Sentiment Analysis",
        issuer: "LinkedIn",
        issued: "July 2024",
      },
      {
        title: "Foundations: Data, Data, Everywhere",
        issuer: "Google",
        issued: "June 2024",
        credentialId: "UQXGQ5ZD8FD3",
      },
      {
        title: "Programming for Everybody (Getting Started with Python)",
        issuer: "University of Michigan",
        issued: "June 2020",
        credentialId: "CZLYL4BB953W",
      },
      {
        title: "Python Data Structures",
        issuer: "University of Michigan",
        issued: "June 2020",
        credentialId: "653H9E34NFHB",
      },
    ],
  },
  {
    label: "Design & Leadership",
    summary:
      "Interdisciplinary credentials spanning visual design, communication, and campus leadership.",
    items: [
      {
        title: "Welcome Ambassadors International Orientation Leader",
        issuer: "Syracuse University",
        issued: "August 2024",
        credentialId: "113950838",
      },
      {
        title: "Introduction to Typography",
        issuer: "California Institute of the Arts",
        issued: "May 2020",
        credentialId: "V9SAJQZBKGIA",
      },
      {
        title: "Ideas from the History of Graphic Design",
        issuer: "California Institute of the Arts",
        issued: "May 2020",
      },
      {
        title: "Imagemaking",
        issuer: "California Institute of the Arts",
      },
      {
        title: "Fundamentals of Graphic Design",
        issuer: "California Institute of the Arts",
        issued: "April 2020",
        credentialId: "BBHVCU7KZS6N",
      },
      {
        title: "Graphic Design Specialization",
        issuer: "California Institute of the Arts",
        issued: "May 2020",
        credentialId: "7TGHQHNPFEJC",
      },
    ],
  },
];

const Certifications = () => {
  const totalCredentials = certificationTracks.reduce(
    (count, track) => count + track.items.length,
    0
  );

  return (
    <section className="certifications-section" id="certifications">
      <div className="certifications-container section-container">
        <div className="certifications-header">
          <span className="certifications-kicker">Credentials & Learning</span>
          <h2 className="certifications-title">
            Certifications <span>&amp; Credentials</span>
          </h2>
          <p>
            A structured view of the certifications, badges, coursework, and
            interdisciplinary learning that support my software, AI, data, and
            product-building work.
          </p>
          <div className="certifications-summary">
            <div className="certifications-summary-card">
              <span>Total credentials</span>
              <strong>{totalCredentials}</strong>
            </div>
            <div className="certifications-summary-card">
              <span>Focus areas</span>
              <strong>Security, AI/ML, data, design</strong>
            </div>
          </div>
        </div>

        <div className="certifications-timeline">
          <div className="certifications-timeline-line">
            <div className="certifications-timeline-dot"></div>
          </div>

          {certificationTracks.map((track) => (
            <article className="certification-track" key={track.label}>
              <div className="certification-track-overview">
                <div className="certification-track-meta">
                  <span className="certification-track-label">{track.label}</span>
                  <strong>{track.items.length} credentials</strong>
                </div>
                <p>{track.summary}</p>
              </div>

              <div className="certification-card-grid">
                {track.items.map((item) => (
                  <div
                    className="certification-card"
                    key={`${track.label}-${item.title}`}
                  >
                    <div className="certification-card-top">
                      <span className="certification-issuer">{item.issuer}</span>
                      {item.issued && (
                        <span className="certification-issued">
                          Issued {item.issued}
                        </span>
                      )}
                    </div>
                    <h3>{item.title}</h3>
                    <div className="certification-meta">
                      {item.expires && (
                        <span className="certification-pill">
                          Expires {item.expires}
                        </span>
                      )}
                      {item.credentialId && (
                        <span className="certification-pill">
                          Credential ID {item.credentialId}
                        </span>
                      )}
                    </div>
                    {item.credentialUrl && (
                      <a
                        className="certification-link"
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        data-cursor="disable"
                      >
                        View credential
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
