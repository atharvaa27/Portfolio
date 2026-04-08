import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:atharvaarane89@gmail.com" data-cursor="disable">
                atharvaarane89@gmail.com
              </a>
            </p>
            <h4>Phone</h4>
            <p>+1 (315) 886 4890</p>
            <h4>Location</h4>
            <p>Little Rock, AR</p>
            <h4>Education</h4>
            <p>MS in Computer Science, Syracuse University</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://linkedin.com/in/atharvaa-rane/"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Linkedin <MdArrowOutward />
            </a>
            <a
              href="/Atharvaa-Rane-Software-Engineer-Resume.pdf"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              Resume <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Atharvaa Rane</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
