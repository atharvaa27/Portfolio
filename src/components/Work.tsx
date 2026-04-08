import { CSSProperties, useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "BlogTracker 2.0 Platform",
    organization: "COSMOS Research Center",
    stage: "2025 · Research Analytics",
    summary:
      "Worked on the live B-Tracker research platform used to track blogs, bloggers, and real-time events through tracker workflows, content analysis, network analysis, and exportable analysis views.",
    metricLabel: "Live stack",
    metric: "Blog Monitoring & Analytics",
    metricDetail:
      "Next.js web app, Python API, Postgres, Elasticsearch, LanceDB, and containerized background analysis services.",
    outcomes: [
      "Supported tracker-based workflows for collecting blog sources, running analysis, and monitoring evolving discussions over time.",
      "Worked across insight views for clustering, narratives, sentiment, topic distribution, keyword trends, domain analysis, posting frequency, and blogger influence.",
      "Contributed to a multi-service platform with web, API, ingest, LDA, embedding, and background runner services coordinated through Docker Compose.",
      "Maintained a research system with trackers, reports, clusters, narratives, entities, embeddings, blogs, bloggers, and post analytics across a large relational schema.",
    ],
    stack: [
      "Next.js 14",
      "Python",
      "PostgreSQL",
      "Elasticsearch",
      "LanceDB",
      "Docker Compose",
      "D3",
      "Recharts",
      "Content Analysis",
      "Network Analysis",
    ],
    signals: [
      { label: "UI", value: "Next.js 14" },
      {
        label: "Analysis",
        value: "Clusters, narratives, sentiment, trends",
      },
      { label: "Data", value: "Blogs, bloggers, posts, trackers" },
      { label: "Database", value: "Postgres + LanceDB" },
    ],
    pipeline: ["Track", "Analyze", "Investigate", "Report"],
    boardTitle: "B-Tracker live stack",
    accent: "#f7a7d8",
    accentSoft: "rgba(247, 167, 216, 0.18)",
  },
  {
    title: "LLM Insight Services",
    organization: "COSMOS Research Center",
    stage: "2025 · GenAI",
    summary:
      "Implemented open-source GPT workflows for text classification, sentiment analysis, and automated insight generation, then wrapped them inside scalable services.",
    metricLabel: "Deployment cycle",
    metric: "-30%",
    metricDetail:
      "after containerizing ML and LLM workflows for consistent runtime environments.",
    outcomes: [
      "Exposed NLP and LLM capabilities through reusable service endpoints.",
      "Improved reproducibility with Dockerized deployment paths.",
      "Enabled scalable insight generation instead of manual interpretation.",
    ],
    stack: [
      "Python",
      "NLP",
      "Open-Source GPT",
      "Docker",
      "Inference APIs",
    ],
    signals: [
      { label: "Input", value: "Text + sentiment" },
      { label: "Runtime", value: "Containerized" },
      { label: "Output", value: "Live insights" },
    ],
    pipeline: ["Collect", "Classify", "Generate", "Route"],
    boardTitle: "GenAI runtime",
    accent: "#f3b79f",
    accentSoft: "rgba(243, 183, 159, 0.18)",
  },
  {
    title: "AI-Enabled Predictive Analytics & Operations Intelligence Platform",
    organization: "Honeywell",
    stage: "USA · Industrial Technology",
    summary:
      "Built a cloud-based, AI-driven analytics platform to monitor equipment health, predict failures, and optimize operational performance across industrial assets using real-time and historical data.",
    metricLabel: "Core capability",
    metric: "Predictive maintenance",
    metricDetail:
      "Failure detection, anomaly identification, and real-time asset monitoring across industrial operations.",
    outcomes: [
      "Developed Python Flask and Django backend services plus REST APIs for data ingestion, analytics, and ML inference.",
      "Built React dashboards, alerts, and asset-health views for operations and engineering teams.",
      "Integrated predictive maintenance, anomaly detection, and trend-analysis models into batch and real-time pipelines.",
      "Containerized services with Docker and supported Kubernetes-based deployments, CI/CD, testing, and production monitoring.",
    ],
    stack: [
      "Python",
      "Flask",
      "Django",
      "React",
      "Scikit-learn",
      "TensorFlow",
      "AWS",
      "Docker",
      "Kubernetes",
    ],
    signals: [
      { label: "Domain", value: "Industrial operations" },
      { label: "Data", value: "IoT sensors + enterprise data" },
      { label: "Analysis", value: "Predictive, anomaly, trend" },
      { label: "Database", value: "SQL + PostgreSQL" },
    ],
    pipeline: ["Ingest", "Analyze", "Predict", "Optimize"],
    boardTitle: "Industrial platform",
    accent: "#c8a0ff",
    accentSoft: "rgba(200, 160, 255, 0.18)",
  },
  {
    title: "AI-Driven Intelligent Analytics & Decision Support Platform",
    organization: "Mindtree",
    stage: "India · IT Services & Digital Transformation",
    summary:
      "Designed and developed a cloud-based intelligent analytics platform that used machine learning and AI to deliver predictive insights, automation, and real-time decision support for enterprise operations.",
    metricLabel: "Core capability",
    metric: "Predictive analytics",
    metricDetail:
      "Forecasting, automated decision-support workflows, dashboards, alerts, and secure cloud-native delivery for enterprise operations.",
    outcomes: [
      "Developed Python Django and Flask backend services plus REST APIs for data processing, analytics, and AI inference.",
      "Built responsive React dashboard and visualization components for real-time insights and decision support.",
      "Implemented ML models for prediction, classification, anomaly detection, and forecasting, then integrated them into batch and real-time inference workflows.",
      "Designed and optimized pipelines for feature extraction, cleansing, transformation, and validation, while supporting Docker, Kubernetes, CI/CD, and production support.",
    ],
    stack: [
      "Python",
      "Django",
      "Flask",
      "React",
      "REST APIs",
      "Scikit-learn",
      "TensorFlow",
      "Pandas",
      "NumPy",
      "SQL",
      "PostgreSQL",
      "AWS",
      "Docker",
      "Kubernetes",
      "Jenkins",
    ],
    signals: [
      { label: "Data", value: "Structured + unstructured data" },
      { label: "Analysis", value: "Predictive, prescriptive, anomaly" },
      { label: "Database", value: "SQL + PostgreSQL" },
      { label: "Runtime", value: "Cloud-native" },
    ],
    pipeline: ["Process", "Model", "Infer", "Support"],
    boardTitle: "Decision support platform",
    accent: "#90e6cf",
    accentSoft: "rgba(144, 230, 207, 0.18)",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <span className="work-kicker">Selected AI Systems</span>
          <h2 className="title">
            Case Studies <span>In Production</span>
          </h2>
          <p>
            Real work shipped across research, industrial analytics, and
            enterprise AI systems: production ML pipelines, LLM services,
            predictive operations platforms, and decision support built for
            actual operational use.
          </p>
        </div>

        <div className="carousel-wrapper">
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <article
                    className="case-study"
                    style={
                      {
                        "--case-accent": project.accent,
                        "--case-accent-soft": project.accentSoft,
                      } as CSSProperties
                    }
                  >
                    <div className="case-study-copy">
                      <div className="case-study-meta">
                        <span className="case-study-index">
                          Case 0{index + 1}
                        </span>
                        <span className="case-study-stage">{project.stage}</span>
                      </div>
                      <p className="case-study-organization">
                        {project.organization}
                      </p>
                      <h3>{project.title}</h3>
                      <p className="case-study-summary">{project.summary}</p>
                      <div className="case-study-impact">
                        <span className="case-study-impact-label">
                          {project.metricLabel}
                        </span>
                        <strong>{project.metric}</strong>
                        <p>{project.metricDetail}</p>
                      </div>
                      <div className="case-study-outcomes">
                        {project.outcomes.map((outcome) => (
                          <div className="case-study-outcome" key={outcome}>
                            <span className="case-study-outcome-dot"></span>
                            <p>{outcome}</p>
                          </div>
                        ))}
                      </div>
                      <div className="case-study-tags">
                        {project.stack.map((tag) => (
                          <span className="case-study-tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="case-study-board">
                      <div className="case-study-board-shell">
                        <div className="case-study-board-header">
                          <span className="case-study-led"></span>
                          <p>{project.boardTitle}</p>
                        </div>
                        <div className="case-study-signal-grid">
                          {project.signals.map((signal) => (
                            <div className="case-study-signal" key={signal.label}>
                              <span>{signal.label}</span>
                              <strong>{signal.value}</strong>
                            </div>
                          ))}
                        </div>
                        <div className="case-study-pipeline">
                          {project.pipeline.map((step, stepIndex) => (
                            <div className="case-study-step" key={step}>
                              <span>0{stepIndex + 1}</span>
                              <strong>{step}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
