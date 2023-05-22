import React from "react";

function Footer() {
  return (
    <footer className="footer">   
    <div className="container--logo">
        <img src="Logo.png" alt="logo" className="footer--logo" />
    </div>
      <div className="footer--container">
        <div className="row">
          <div className="col-md-4">
            <h3>Become a Mentor</h3>
          </div>

          <div className="col-md-4">
            <h3>Find a Mentor</h3>
          </div>

          <div className="col-md-4">
            <h3>Community</h3>
          </div>

        </div>

        <div className="row2">
            <div className="col-md-4">
                <h3>Join</h3>
            </div>

            <div className="col-md-4">
                <h3>Help</h3>
            </div>

            <div className="col-md-4">
                <h3>FAQs</h3>
            </div>

            <div className="col-md-4">
                <h3>Partnerships</h3>
            </div>
        </div>
      </div>

    <div className="footer--container">
      <div className="footer--sosmed">
        <img src="twitterfooter.png" alt="twitter" className="footer--sosmed--icon" />
        <img src="insta.png" alt="instagram" className="footer--sosmed--icon" />
        <img src="tiktok.png" alt="tiktok" className="footer--sosmed--icon" />
      </div>

      <div className="row3">
        <div className="col-md-4">
            <p>Contact Us</p>
        </div>
        <div className="col-md-4">
            <p>Privacy Policy</p>
        </div>
        <div className="col-md-4" >
            <p>Terms of Service</p>
        </div>
        <div className="col-md-4" >
            <p>Sitemap</p>
        </div>
      </div>

    </div>


    <div className="bottom--bar">
        <div className="bottom--container">
          <div className="bottom--row">
            <div className="col-md-6">
                <p>Skillective</p>
              <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
