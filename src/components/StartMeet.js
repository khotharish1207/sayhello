import React, { useState } from "react";
import UrlParse from "url-parse";
import {
  Modal,
  InputGroup,
  FormControl,
  Button,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { setCookie, getCookie } from "../utils/coockie";
import { trackEvent, postData } from "../utils";

const options = [
  { name: "Audio", value: 1 },
  { name: "Video", value: 2 },
];

function StartMeet({ onClose, onStart, show }) {
  const urlParser = new UrlParse(window.location.href, true);
  const room = urlParser.query.roomId;

  const [radioValue, setRadioValue] = useState(1);
  const [roomId, setRoom] = useState(room || "");
  const [displayName, setDisplayName] = useState(
    getCookie("displayName") || ""
  );

  const onStartMeet = () => {
    setCookie("displayName", displayName);
    urlParser.query.roomId = roomId;
    window.history.pushState("", "", urlParser.toString());
    const startAudioOnly = radioValue === 1;

    onClose();
    onStart(roomId, displayName, startAudioOnly);

    trackEvent("Start Meeting", {
      roomId,
      displayName,
    });
    postData({
        roomId,
        displayName,
      })
  };

  return (
    <Modal show={show} keyboard={false} centered backdropClassName={`backdropClassName`}>
      <Modal.Header className="justify-content-center">
        <Modal.Title>Start Meet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text  id="inputGroup-sizing-default ">
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
        <InputGroup className="mb-3">
          <InputGroup.Prepend >
            <InputGroup.Text  id="inputGroup-sizing-default ">
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
        <InputGroup className="mb-3">
          <ButtonGroup toggle>
            {options.map((opt, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant={
                  radioValue === opt.value ? "primary" : "outline-primary"
                }
                name="radio"
                value={opt.value}
                checked={radioValue === opt.value}
                onChange={(e) => setRadioValue(Number(e.currentTarget.value))}
              >
                {opt.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          block
          onClick={onStartMeet}
          disabled={!roomId || !displayName}
        >
          Say Hello
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StartMeet;
