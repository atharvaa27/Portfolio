import { PropsWithChildren } from "react";
import "./styles/Landing.css";

const Landing = ({ children }: PropsWithChildren) => {
  const landingTags = [
    "Python APIs",
    "ML Pipelines",
    "NLP Workflows",
    "Cloud Deployments",
  ];
  const labTiles = [
    { label: "Role", value: "Software engineer building AI-first products" },
    { label: "Stack", value: "Python, Django, Flask, React" },
    { label: "Focus", value: "APIs, ML pipelines, NLP, forecasting" },
  ];
  const pipelineSteps = ["Backend", "Analytics", "Inference", "Cloud"];

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Software Engineer · AI Systems · NLP</h2>
            <h1>
              ATHARVAA
              <br />
              <span>RANE</span>
            </h1>
            <p className="landing-summary">
              Building production-ready AI software for analytics, forecasting,
              NLP workflows, and real-time inference. I design the backend,
              model lifecycle, and cloud path that turns ML ideas into systems
              people actually use.
            </p>
            <div className="landing-chip-row">
              {landingTags.map((tag) => (
                <span className="landing-chip" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="landing-metric-grid">
              <div className="landing-metric-card">
                <strong>4 yrs</strong>
                <span>shipping data-driven software</span>
              </div>
              <div className="landing-metric-card">
                <strong>Python-first</strong>
                <span>backend, ML pipelines, inference services</span>
              </div>
              <div className="landing-metric-card">
                <strong>AWS / Azure</strong>
                <span>cloud-ready deployment and model operations</span>
              </div>
            </div>
          </div>
          <div className="landing-info">
            <h3>Portfolio // Live</h3>
            <div className="landing-word-window">
              <h2 className="landing-info-h2">
                <span className="landing-h2-1">Software</span>
                <span className="landing-h2-2">Analytics</span>
              </h2>
            </div>
            <div className="landing-word-window landing-word-window-secondary">
              <h2 className="landing-info-line">
                <span className="landing-h2-info">Engineer</span>
                <span className="landing-h2-info-1">Systems</span>
              </h2>
            </div>
            <div className="landing-lab-card">
              <div className="landing-lab-head">
                <span className="landing-lab-led"></span>
                <p>What I build</p>
              </div>
              <div className="landing-lab-grid">
                {labTiles.map((tile) => (
                  <div className="landing-lab-tile" key={tile.label}>
                    <span>{tile.label}</span>
                    <strong>{tile.value}</strong>
                  </div>
                ))}
              </div>
              <div className="landing-pipeline">
                {pipelineSteps.map((step, index) => (
                  <div className="landing-pipeline-step" key={step}>
                    <span>0{index + 1}</span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
