import React, { useState } from "react";
import UrlParse from "url-parse";
import { Modal, InputGroup, FormControl, Button } from "react-bootstrap";
import { setCookie, getCookie } from "../utils/coockie";

function StartMeet({ onClose, onStart, show }) {
  const urlParser = new UrlParse(window.location.href, true);
  const room = urlParser.query.roomId;
  const [roomId, setRoom] = useState(room || "");

  const [displayName, setDisplayName] = useState(
    getCookie("displayName") || "My Name"
  );

  const onStartMeet = () => {
    setCookie("displayName", displayName);
    urlParser.query.roomId = roomId;
    window.history.pushState("", "", urlParser.toString());
    onClose();
    onStart(roomId, displayName);
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false} centered>
      <Modal.Header className="justify-content-md-center">
        <Modal.Title>Start Meet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Room Id
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(e) => setRoom(e.target.value)}
            value={roomId}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
        <br />
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Name
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onStartMeet}>
          Start Meet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StartMeet;
