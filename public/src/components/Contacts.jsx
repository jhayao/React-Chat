import React, { useState, useEffect } from "react";
import {
  MDBCol,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { Scrollbars } from "react-custom-scrollbars";

export default function Contacts({ contacts, changeChat }) {
  const [currentUsername, setCurrentUsername] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data)
    setCurrentUsername(data.name);
  }, []);

  const changedCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    currentUsername && (
      <MDBCol md="6" lg="5" xl="4" className="mb-1 mb-md-0">
        <div className="p-3">
          <MDBInputGroup className="rounded mb-3">
            <input
              className="form-control rounded"
              placeholder="Search"
              type="search"
            />
            <span className="input-group-text border-0" id="search-addon">
              <MDBIcon fas icon="search" />
            </span>
          </MDBInputGroup>

          <Scrollbars style={{ position: "relative", height: "500px" }}>
            <MDBTypography listUnStyled className="mb-0">
              {contacts.map((contact, index) => {
                // console.log(contact);
                return (
                  <li key={index} className="p-2 border-bottom">
                    <a href={`#${contact.email}`} onClick={()=>{changedCurrentChat(index,contact)}}   className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div>
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                            alt="avatar"
                            className="d-flex align-self-center me-3"
                            width="60"
                          />
                          <span className="badge bg-success badge-dot"></span>
                        </div>
                        <div className="pt-1 text-center">
                          <p className="fw-bold mb-0 text-center">{contact.name}</p>
                          
                        </div>
                      </div>
                      
                    </a>
                  </li>
                );
              })}
            </MDBTypography>
          </Scrollbars>
        </div>
      </MDBCol>
    )
  );
}
