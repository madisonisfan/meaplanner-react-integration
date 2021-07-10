import React from "react";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col col-sm-3 text-center">
            <h5>Check Us Out</h5>
            <ul class="list-unstyled">
              <li>Instagram</li>
              <li>Twitter</li>
              <li>Facebook</li>
            </ul>
          </div>

          <div class="col-6 text-center d-none d-sm-block">
            <h3>Meal Planner</h3>
          </div>

          <div class="col col-sm-3 text-center">
            <h5>Contact Us</h5>
            <ul class="list-unstyled">
              <li>
                <a href="/#">email@gmail.com</a>
              </li>
              <li>
                <a href="/#">310-xxx-xxx</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/*Container */}
    </footer>
  );
}

export default Footer;
