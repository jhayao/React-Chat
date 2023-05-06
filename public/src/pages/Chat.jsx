import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Scrollbars } from "react-custom-scrollbars";
import Contacts from "../components/Contacts";
import { alluserRoute } from "../utils/apiRoutes";
import Welcome from "../components/Welcome";
import Chatbox from "../components/Chatbox";


export default function App() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);

    useEffect( () => {
        if(!localStorage.getItem("user")){
            navigate("/login");
        }
        else{
            setCurrentUser(JSON.parse(localStorage.getItem("user")));
        }
        
    }, [])

    useEffect( () => {
        if(currentUser){
            const getContacts = async () => {
                const {data} = await axios.get(`${alluserRoute}/${currentUser._id}`);
                setContacts(data);
            }
            getContacts();
        }
    }, [currentUser])

    const handleChatChange = (chat) =>
    {
      setCurrentChat(chat);
    }
  return (
    <MDBContainer
      fluid
      className="py-5"
      style={{ backgroundColor: "#CDC4F9", height: "100vh" }}
    >
      <MDBRow>
        <MDBCol md="12">
          <MDBCard id="chat3" style={{ borderRadius: "15px", height: "90vh" }}>
            <MDBCardBody>
              <MDBRow>
                <Contacts contacts={contacts} changeChat={handleChatChange}></Contacts>
                { currentChat === undefined? (
                  <Welcome currentUser ={currentUser}></Welcome>
                ) :(
                  <Chatbox user={currentUser} currentChat={currentChat}></Chatbox>
                )}
                
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
