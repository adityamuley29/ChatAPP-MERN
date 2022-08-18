import React, { useEffect, useState } from "react";
import Logout from "./Logout";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [chatActive, setChatActive] = useState(true);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="contacts-container">
          <div className="contactActionButtons">
            <div
              className={`Button-container ${
                chatActive && "contactActionButtonsSelected"
              }`}
              onClick={() => setChatActive(true)}
            >
              <a href={(e) => e.preventDefault()}>Chats</a>
            </div>
            <div
              className={`Button-container ${
                !chatActive && "contactActionButtonsSelected"
              }`}
              onClick={() => setChatActive(false)}
            >
              <a href={(e) => e.preventDefault()}>Rooms</a>
            </div>
          </div>

          {chatActive ? (
            <div className="contacts">
              {contacts.map((contact, index) => {
                return (
                  <div
                    className={`contact ${
                      index === currentSelected ? "selected" : ""
                    }`}
                    key={contact._id}
                    onClick={() => {
                      changeCurrentChat(index, contact);
                    }}
                  >
                    <div className="avatar">
                      <img
                        src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                        alt="avatar"
                      />
                    </div>
                    <div className="username">
                      <h3>{contact.username}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}

          <div className="current-user">
            <div className="currentUser-container">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>

            <Logout />
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
