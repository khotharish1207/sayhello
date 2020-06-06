import React, { useState, useEffect } from "react";
import { Row, Toast, Button } from "react-bootstrap";
import LoadingModal from "./components/LoadingModal";
import StartMeet from "./components/StartMeet";
import { detectMob } from "./utils";

function JitsiMeetComponent() {
  const [loading, setLoading] = useState(false);
  const [startMeet, setStart] = useState(false);
  const [showToast, setToast] = useState(false);

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
  };

  function startConference(roomId, displayName, startAudioOnly) {
    setLoading(true);
    try {
      // const urlParser = new UrlParse(window.location.href, true);
      // let roomId = urlParser.query.roomId;
      const domain = "meet.jit.si";
      const options = {
        roomName: `${roomId}`,
        parentNode: document.getElementById("jitsi-container"),
        interfaceConfigOverwrite: {
          filmStripOnly: false,
          DEFAULT_REMOTE_DISPLAY_NAME: "",
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
          APP_NAME: `Say Hello`,
          DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
          NATIVE_APP_NAME: `Say Hello`,
          PROVIDER_NAME: "Harish",
          INVITATION_POWERED_BY: false,
          VERTICAL_FILMSTRIP: true,
          ENABLE_FEEDBACK_ANIMATION: true,
          VIDEO_QUALITY_LABEL_DISABLED: true,
          SHOW_CHROME_EXTENSION_BANNER: false,
          HIDE_KICK_BUTTON_FOR_GUESTS: true,
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            !detectMob() && "desktop",
            "fullscreen",
            "hangup",
            "profile",
            "chat",
            "sharedvideo",
            "raisehand",
            "videoquality",
            "filmstrip",
            "mute-everyone",
            "security",
          ].filter((x) => x),
        },
        configOverwrite: {
          disableSimulcast: false,
          enableClosePage: false,
          enableWelcomePage: true,
          enableNoAudioDetection: false,
          disableDeepLinking: true,
          enableNoisyMicDetection: false,
          startAudioOnly,
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      api.addEventListener("videoConferenceJoined", () => {
        setLoading(false);
        api.executeCommand("displayName", displayName);
      });

      api.addEventListener("readyToClose", () => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Failed to load Jitsi API", error);
    }
  }

  useEffect(() => {
    // verify the JitsiMeetExternalAPI constructor is added to the global..
    if (window.JitsiMeetExternalAPI) setStart(true);
    else alert("Jitsi Meet API script not loaded");
  }, []);

  const copyTextToClipboard = (text) => {
    navigator.clipboard.writeText(window.location.href).then(
      function () {
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 1500);
      },
      function (err) {
        console.error("Async: Could not copy text: ");
      }
    );
  };

  return (
    <div fluid style={containerStyle}>
      <LoadingModal show={loading} />
      <StartMeet
        show={startMeet}
        onStart={startConference}
        onClose={() => setStart(false)}
      />
      {!loading && !startMeet && (
        <Row style={{ position: "absolute", margin: "10px" }}>
          <Button
            variant="outline-light"
            size="sm"
            onClick={copyTextToClipboard}
          >
            Copy meeting
          </Button>
          <Toast show={showToast}>
            <Toast.Body>Url copied to clipboard</Toast.Body>
          </Toast>
        </Row>
      )}
      <div id="jitsi-container" style={jitsiContainerStyle} />
    </div>
  );
}

export default JitsiMeetComponent;
