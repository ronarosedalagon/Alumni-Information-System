import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Figure,
} from "react-bootstrap";
import logo from "../assets/images/logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/style.css";


const Dashboard = () => {
    return (
      <>
      <div className="bg-dark" style={Style.autoHeight}>
        <Container className="py-1" style={Style.autoHeight}>
          <Row className="my-2">
            <Col className="col-sm-12 col-md--7 col-lg-4 mx-auto">
                  <Card className="my-5">
                    <Card.Body className="text-center">
                      <Figure>
                        <Figure.Image
                          width={100}
                          height={100}
                          alt="171x180"
                          className="mx-auto d-block mt-3"
                          src={logo}
                        />
                      </Figure>
                      <Card.Title className="mb-5" style={Style.title}>
                        WELCOME
                      </Card.Title>
                      
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        {/* )} */}
      </>
    );
  };
  
  
  const Style = {
    title: {
      fontFamily: "Rockwell",
      fontWeight: "700",
      fontSize: "20px",
    },
    body: {
      margin: "0px",
      maxWidth: "100%",
    },
  
    autoHeight: {
      minHeight: "100vh",
    },
  
    noOutline: {
      outline: "none",
    },
    textRight: {
      textAlign: "right",
      fontSize: "12px",
    },
    link: {
      textDecoration: "none",
      fontSize: "12px",
    },
  };
  
  export default Dashboard;
