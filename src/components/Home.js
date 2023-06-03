import { useState, useEffect } from "react";
import Promosi from "./Promosi";
import KotakMentor from "./KotakMentor";
import Category from "./Category";
import KotakKomen from "./KotakKomen";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Home.css";
import { UserAuth } from '../context/AuthContext';

export function Home() {
  const [home, setHome] = useState(true);
  const { user, setUser } = UserAuth();

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
    });
  }, []);

  const home_content = (home) => {
    if (home) {
      return (
        <div className="home--promo">
          <h1 className="home--tagline">
            Get coaching from top mentors to help you learn and develop skills
          </h1>
          <p className="home--tagline--text">
            Book and meet mentors for one-on-one mentoring in our global
            community.
          </p>
          <div className="home--promo--box" data-aos="fade-up">
            <Promosi
              image="foto-comms.jpg"
              title="Check out our new mentoring class!"
              isi="Skilective provides a platform for you to learn and develop skills from the best."
            />
            <Promosi
              image="community.jpg"
              title="Supportive community"
              isi="We provide community that could help escalate your career."
            />
            <Promosi
              image="belajar.jpg"
              title="How to manage projects"
              isi="Learn how to manage your projects with our best mentors."
            />
          </div>

          <p className="home--view">View More</p>
        </div>
      );
    } else {
      return (
        <div className="home--request">
          <h1 className="home--tagline">Project Submission Form</h1>
          <p className="home--tagline--text">
            The projects that we prioritize are projects with deadlines and
            costs that are in accordance with the complexity of the project and
            projects that already have a design plan will be processed more
            quickly.
          </p>
          <a href="/project" className="req">
            <button className="home--request--button">Request Project</button>
          </a>
        </div>
      );
    }
  };

  const onDifficultyChange = (event) => {
    if (event.target.value === "easy") {
      setHome(true);
    } else if (event.target.value === "medium") {
      setHome(false);
    }
  };

  return (
    <div className="home">
      <div className="home--bg">
        <div className="home--choice">
          <label>
            <input
              type="radio"
              name="difficulty"
              value="easy"
              checked={home}
              onChange={onDifficultyChange}
            />
            <span className="home--choice--button cursor-pointer">Home</span>
          </label>
          <label>
            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={!home}
              onChange={onDifficultyChange}
            />
            <span className="home--choice--button cursor-pointer">
              Request Project
            </span>
          </label>
        </div>
        {home_content(home)}
      </div>
      <p style={{ fontSize: "20px" }}>
        <b>Collaborated with 40+ companies</b>
      </p>
      <div className="home--startup">
        <div className="scrolling-wrapper">
          <img
            src="./startuplogo/gojek.jpg"
            alt="gojek"
            className="home--startup--logo--gojek"
          />
          <img
            src="./startuplogo/shopee.png"
            alt="shopee"
            className="home--startup--logo"
          />
          <img
            src="./startuplogo/tokped.png"
            alt="tokped"
            className="home--startup--logo"
          />
          <img
            src="./startuplogo/tiket.png"
            alt="tiket"
            className="home--startup--logo--tiket"
          />
          <img
            src="./startuplogo/octopus.png"
            alt="octopus"
            className="home--startup--logo"
          />
          <img
            src="./startuplogo/traveloka.png"
            alt="traveloka"
            className="home--startup--logo"
          />
        </div>
      </div>

      <p style={{ fontSize: "32px" }}>
        <b>Learn and grow across expertise for free</b>
      </p>
      <p style={{ fontSize: "24px" }}>
        Find mentors from product fields across the globe
      </p>

      <div className="home--category" data-aos="fade-up">
        <div className="home--category--row">
          <Category nama="Product Management" conds={false} />
          <Category nama="UI/UX Design" conds={false} />
          <Category nama="Artificial Intelligence" conds={false} />
          <Category nama="Quality Assurance" conds={false} />
        </div>
        <div className="home--category--row">
          <Category nama="Data Science" conds={false} />
          <Category nama="Software Engineering" conds={false} />
          <Category nama="Data Engineering" conds={false} />
          <Category nama="Explore All Fields" conds={true} />
        </div>
      </div>
      <div className="discover--tag">
        <p className="discover--tag--text">Discover our Mentors</p>
        <div className="discover--tag--button">
          <button className="discover--tag--button--explore">
            Explore All
          </button>
          <img
            src="back.jpg"
            alt="back"
            className="discover--tag--button--back"
          />
          <img
            src="back.jpg"
            alt="next"
            className="discover--tag--button--next"
          />
        </div>
      </div>

      <div className="home--mentor">
        <div className="home--mentor--row" data-aos="fade-left">
          <KotakMentor
            image="fotomentor/gibeh.jpg"
            nama="Testing123"
            jabatan="Head of Engineering"
            org="Gojek"
            exp="7 years"
          />
          <KotakMentor
            image="fotomentor/auva.jpg"
            nama="Auvarifqi"
            jabatan="Head of Product"
            org="Shopee"
            exp="5 years"
          />
        </div>
        <div className="home--mentor--row" data-aos="fade-right">
          <KotakMentor
            image="fotomentor/iyal.jpg"
            nama="Iyal"
            jabatan="Head of Engineering"
            org="Tokopedia"
            exp="7 years"
          />
          <KotakMentor
            image="fotomentor/naufal.jpg"
            nama="Naufal"
            jabatan="Head of Data"
            org="Tiket.com"
            exp="5 years"
          />
        </div>
      </div>
      <p className="home--checkout">Checkout our member's opinion</p>

      <div className="home--review">
        <div className="home--review--row" data-aos="zoom-in">
          <KotakKomen
            image="fotomentor/adre.jpg"
            komen="Skillective is a great platform to learn and develop skills. I learn lot of new skills from my beloved mentor"
            nama="Adrenalin"
            jabatan="Student"
            org="Bandung Institute of Technology"
          />
          <KotakKomen
            image="fotomentor/abam.jpg"
            komen="Skillective gave me tons of insight to help me escalate my career. Thank you Skillective!"
            nama="Abraham"
            jabatan="Student"
            org="Massachusetts Institute of Technology"
          />
        </div>
      </div>
      <p style={{ fontSize: "32px", fontWeight: "700", lineHeight: "44px" }}>
        Through mentoring, your next chapter will be greatly facilitated.
      </p>
      <p style={{ fontSize: "24px", fontWeight: "300", lineHeight: "33px" }}>
        Discover mentors from various countries to assist you in achieving your
        goals and overcome any difficulties.
      </p>

      {!user&&<div className="home--start--container">
        <div className="home--started" data-aos="zoom-in">
          <h1 className="home--started--text">Get Started!</h1>
        </div>
      </div>}
    </div>
  );
}
