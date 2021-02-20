import React, { useState, useEffect } from "react";
import { Row, Toast, Button } from "react-bootstrap";
import LoadingModal from "./components/LoadingModal";
import StartMeet from "./components/StartMeet";
import { detectMob, identify } from "./utils";

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
        parentNode: document.getElementById("conf-container"),
        interfaceConfigOverwrite: {
          DEFAULT_BACKGROUND: '#007bff',
          DISPLAY_WELCOME_PAGE_CONTENT: false,
          MOBILE_APP_PROMO: false,
          PROVIDER_NAME: 'Say Hello',
          APP_NAME: `Say Hello`,

          SHOW_BRAND_WATERMARK: false,
          SHOW_CHROME_EXTENSION_BANNER: false,
          VIDEO_QUALITY_LABEL_DISABLED: true,

          SHOW_DEEP_LINKING_IMAGE: false,
          SHOW_JITSI_WATERMARK: false,
          SHOW_POWERED_BY: false,
          SHOW_PROMOTIONAL_CLOSE_PAGE: false,
          SHOW_WATERMARK_FOR_GUESTS: false,

          VERTICAL_FILMSTRIP: !detectMob(),
          JITSI_WATERMARK_LINK: window.location.href,
          BRAND_WATERMARK_LINK: window.location.href,

          DEFAULT_LOGO_URL: './camera.jpg',
          DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Speaker',
          DEFAULT_WELCOME_PAGE_LOGO_URL: './camera.jpg',

          // filmStripOnly: false,
          // DEFAULT_REMOTE_DISPLAY_NAME: "",
          // SHOW_JITSI_WATERMARK: false,
          // SHOW_WATERMARK_FOR_GUESTS: false,
          // APP_NAME: `Say Hello`,
          // DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
          // NATIVE_APP_NAME: `Say Hello`,
          // PROVIDER_NAME: "Harish",
          // INVITATION_POWERED_BY: false,
          // VERTICAL_FILMSTRIP: true,
          // ENABLE_FEEDBACK_ANIMATION: true,
          // VIDEO_QUALITY_LABEL_DISABLED: true,
          // SHOW_CHROME_EXTENSION_BANNER: false,
          // HIDE_KICK_BUTTON_FOR_GUESTS: true,
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
            'tileview',
            // "security",
          ].filter((x) => x),
        },
        configOverwrite: {
          disableSimulcast: false,
          enableClosePage: false,
          enableWelcomePage: false,
          enableNoAudioDetection: false,
          disableDeepLinking: true,
          enableNoisyMicDetection: false,

          startWithVideoMuted: startAudioOnly
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);
      setLoading(false);
      api.executeCommand("displayName", displayName);

      api.addEventListener("videoConferenceJoined", () => {
        setLoading(false);

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
    if (window.JitsiMeetExternalAPI) {
      setStart(true);
      identify({ device: detectMob() ? "Mobile" : "Desktop" });
    } else alert("Jitsi Meet API script not loaded");
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
        console.error("Could not copy text: ");
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
      <div id="conf-container" style={jitsiContainerStyle} />
    </div>
  );
}

export default JitsiMeetComponent;
