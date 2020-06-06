import React, { useState, useEffect } from "react";
import UrlParse from "url-parse";
import { Container, Row, Col } from "react-bootstrap";
import LoadingModal from "./components/LoadingModal";
import StartMeet from "./components/StartMeet";

// if (!roomId) {
//   roomId = new Date().getTime();

//   urlParser.query.roomId = roomId;
//   window.history.pushState("", "", urlParser.toString());
// }

function JitsiMeetComponent() {
  const [loading, setLoading] = useState(false);
  const [startMeet, setStart] = useState(false);
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const jitsiContainerStyle = {
    display: loading ? "none" : "block",
    width: "100%",
    height: "100%",
  };

  function startConference(roomId, displayName) {
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
          VERTICAL_FILMSTRIP: false,
          ENABLE_FEEDBACK_ANIMATION: true,
          VIDEO_QUALITY_LABEL_DISABLED: true,
          SHOW_CHROME_EXTENSION_BANNER: false,
          HIDE_KICK_BUTTON_FOR_GUESTS: true,
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "closedcaptions",
            "desktop",
            "fullscreen",
            "hangup",
            "profile",
            "chat",
            // "recording",
            // "livestreaming",
            "sharedvideo",
            "raisehand",
            "videoquality",
            "filmstrip",
            // "invite",
            "mute-everyone",
            "security",
          ],
        },
        configOverwrite: {
          disableSimulcast: false,
          enableClosePage: false,
          enableWelcomePage: true,
          disableDeepLinking: true,
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
    //startConference();
    else alert("Jitsi Meet API script not loaded");
  }, []);

  return (
    <Container fluid style={containerStyle}>
      <LoadingModal show={loading} />
      <StartMeet
        show={startMeet}
        onStart={startConference}
        onClose={() => setStart(false)}
      />
      <div id="jitsi-container" style={jitsiContainerStyle} />
    </Container>
  );
}

export default JitsiMeetComponent;
