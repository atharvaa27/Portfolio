import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer (AI)</h4>
                <h5>COSMOS Research Center, University of Arkansas at Little Rock</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Designed and owned production-grade AI applications using Python,
              NLP, and generative AI. Productionized ML pipelines with Scikit-learn,
              XGBoost, and LightGBM, and deployed Dockerized inference services for
              scalable analytics and automation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Honeywell, USA</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Developed and deployed AI/ML services for underwriting and claims
              analytics, including customer segmentation and policy lapse prediction.
              Built robust feature engineering and validation pipelines, and shipped
              containerized inference services on AWS.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Mindtree, India</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Delivered AI-enabled Python applications for policy servicing and claims
              analytics. Built backend services with Django and Flask, exposed
              RESTful APIs for predictive insights, and led AWS deployments for
              reliable ML-powered production environments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
