import React, { useState, useEffect, useRef } from "react";
import { sendMessageRoute, getAllMessageRoute, host } from "../utils/apiRoutes";
import axios from "axios";
import { MDBCol, MDBIcon } from "mdb-react-ui-kit";
import { Scrollbars } from "react-custom-scrollbars";
import io from "socket.io-client";
export default function Chatbox({ user, currentChat }) {
  const socket = useRef();
  const scrollref = useRef();
  const [messages, setMessages] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const handleSetMessages = (message) => {
    setMessages(message);
  };

  const options = {
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    const getAllMessage = async () => {
      if (currentChat) {
        const res = await axios.post(getAllMessageRoute, {
          sender: user._id,
          receiver: currentChat._id,
        });
        setAllMessages(res.data);
      }
    };
    getAllMessage();
  }, [user, currentChat]);

  const handleSendMessage = async (message) => {
    await axios.post(sendMessageRoute, {
      sender: user._id,
      receiver: currentChat._id,
      message: message,
    });

    socket.current.emit("send-message", {
      sender: user._id,
      receiver: currentChat._id,
      message: message,
    });

    const msg = [...allMessages];
    msg.push({
      fromSelf: true,
      message: message,
      createdAt: Date.now(),
    });
    setAllMessages(msg);
    setMessages("");
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("receive-message", (data) => {
        console.log(data);
        setNewMessage({
          fromSelf: false,
          message: data,
          createdAt: Date.now(),
        });
      });
    }
  }, []);

  useEffect(() => {
    console.log(newMessage);
    newMessage && setAllMessages((prev) => [...prev, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    console.log(scrollref)
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    user && (
      <MDBCol md="6" lg="7" xl="8">
        <Scrollbars
          style={{ position: "relative", height: "500px" }}
          className="pt-3 pe-3"
        >
          {allMessages.map((message, index) => {
            return message.fromSelf ? (
              <div key={index} className="d-flex  flex-row justify-content-end">
                <div>
                  <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                    {message.message}
                  </p>
                  <p className="small me-3 mb-3 rounded-3 text-muted">
                    {new Date(message.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div>
            ) : (
              <div
                key={index}
                className="d-flex flex-row justify-content-start"
              >
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div>
                  <p
                    className="small p-2 ms-3 mb-1 rounded-3"
                    style={{ backgroundColor: "#f5f6f7" }}
                  >
                    {message.message}
                  </p>
                  <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                    {new Date(message.createdAt).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </Scrollbars>
        <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
            alt="avatar 3"
            style={{ width: "40px", height: "100%" }}
          />
          <input
            type="text"
            className="form-control form-control-lg"
            id="exampleFormControlInput2"
            onChange={(e) => handleSetMessages(e.target.value)}
            value={messages}
            placeholder="Type message"
          />
          <a className="ms-1 text-muted" href="#!">
            <MDBIcon fas icon="paperclip" />
          </a>
          <a className="ms-3 text-muted" href="#!">
            <MDBIcon fas icon="smile" />
          </a>
          <a
            className="ms-3"
            onClick={() => handleSendMessage(messages)}
            href="#!"
          >
            <MDBIcon fas icon="paper-plane" />
          </a>
        </div>
      </MDBCol>
    )
  );
}
