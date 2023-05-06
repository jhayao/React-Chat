import React from "react";
import { MDBCol } from "mdb-react-ui-kit";
import Lottie from "react-lottie";
import animationData from "../lottie/welcome.json";

export default function Welcome(currentUser) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  

  return (
    <MDBCol md="6" lg="7" xl="8">
      <div className="mx-auto d-block mt-5">
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
      <h2 className="text-center">Welcome {currentUser.name}</h2>
      <h3 className="text-center">Please select a contact to chat.</h3>
    </MDBCol>
  );
}
