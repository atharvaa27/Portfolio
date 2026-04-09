import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { smoother } from "../Navbar";

export function initialFX() {
  document.body.style.overflowY = "auto";
  smoother.paused(false);
  document.getElementsByTagName("main")[0].classList.add("main-active");
  gsap.to("body", {
    backgroundColor: "#0a0e17",
    duration: 0.5,
    delay: 1,
  });

  var landingText = new SplitText(
    [".landing-info h3", ".landing-intro h2", ".landing-intro h1"],
    {
      type: "chars,lines",
      linesClass: "split-line",
    }
  );
  gsap.fromTo(
    landingText.chars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    {
      opacity: 1,
      duration: 1.2,
      filter: "blur(0px)",
      ease: "power3.inOut",
      y: 0,
      stagger: 0.025,
      delay: 0.3,
    }
  );

  gsap.fromTo(
    [".landing-info-h2", ".landing-info-line"],
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      y: 0,
      delay: 0.8,
    }
  );
  gsap.fromTo(
    [".header", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      ease: "power1.inOut",
      delay: 0.1,
    }
  );

  gsap.set([".landing-h2-2", ".landing-h2-info-1"], {
    yPercent: 115,
    opacity: 0,
  });
  gsap.set([".landing-h2-1", ".landing-h2-info"], {
    yPercent: 0,
    opacity: 1,
  });

  LoopText(".landing-h2-1", ".landing-h2-2");
  LoopText(".landing-h2-info", ".landing-h2-info-1");
}

function LoopText(text1: string, text2: string) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
  const hold = 3.8;
  const duration = 0.95;

  tl.to(text1, {
    yPercent: -115,
    opacity: 0,
    duration,
    ease: "power3.inOut",
    delay: hold,
  })
    .to(
      text2,
      {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: "power3.inOut",
      },
      "<"
    )
    .to(text2, {
      yPercent: -115,
      opacity: 0,
      duration,
      ease: "power3.inOut",
      delay: hold,
    })
    .set(text1, { yPercent: 115, opacity: 0 }, "<")
    .to(
      text1,
      {
        yPercent: 0,
        opacity: 1,
        duration,
        ease: "power3.inOut",
      },
      "<"
    )
    .set(text2, { yPercent: 115, opacity: 0 }, "<");
}
