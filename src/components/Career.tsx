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
                <h5>HCL Tech, USA</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Designed and deployed LLM-powered applications with RAG, LangChain,
              OpenAI, and vector databases. Built FastAPI and Flask microservices
              for AI/ML model serving, optimized inference with ONNX and Triton,
              and delivered React and Node.js interfaces for enterprise workflows.
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
              Developed ML models and NLP solutions with Scikit-learn, TensorFlow,
              and Hugging Face Transformers. Built Flask and FastAPI services,
              data pipelines with Python, Pandas, SQL, Spark, and Kafka, and
              supported Docker, Jenkins, and Git-based deployment workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
