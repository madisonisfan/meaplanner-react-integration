import React from "react";
import { Row, Col } from "reactstrap";

function PageTitleComponent({ title }) {
  return (
    <div className="container mx-auto title-container">
      <Row>
        <Col xs={12}>
          <h2 className="title">{title}</h2>
        </Col>
      </Row>
    </div>
  );
}

export default PageTitleComponent;
