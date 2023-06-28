import * as React from "react";
import { useState, useEffect } from "react";
import { CommandBarButton, PrimaryButton } from "@fluentui/react/lib/Button";
import styles from "./SppacFeedback.module.scss";

import { sp } from "@pnp/sp/presets/all";

import {
  ICommandBarStyles,
  IButtonStyles,
  IModalStyles,
  Modal,
  ITextStyles,
} from "@fluentui/react";
import { Icon, TextField } from "@fluentui/react";

import "./style.css";
import { unset } from "@microsoft/sp-lodash-subset";
import { log } from "@pnp/pnpjs";

const Feedback = (props: any) => {
  const [ismodal, setIsmodal] = useState(false);
  const [feddbacklist, setFeedbacklist] = useState({
    isHelpful: "",
    Description: "",
  });

  const buttonStyles: Partial<IButtonStyles> = {
    root: {
      color: "#000",
      padding: "5px 8px",
      borderRadius: "2px",
      ".ms-Button-label": {
        color: "#0078D4",
        fontSize: "16px",
        fontWeight: 600,
      },
    },
    rootHovered: {
      backgroundColor: "#ddd",
      color: "#000",
    },
    icon: {
      fontSize: "16px",
      color: "#0078D4",
    },
    iconHovered: {
      color: "#0078D4",
    },
  };
  const modalStyles: Partial<IModalStyles> = {
    root: {
      width: "100%",
      backgroundColor: "unset !important",
      // Add more dynamic styles as needed
      ".ms-Dialog-main": {
        padding: "20px 25px !important",
        width: "30% !important",
        borderRadius: "4px",
      },
    },
    // Add more style keys and values as needed
  };
  const cancelbtn: Partial<IButtonStyles> = {
    root: {
      fontSize: "19px",
      fontWeight: "900",
      color: "#000 !important",
      cursor: "pointer",
    },
  };
  const activeBtn: Partial<IButtonStyles> = {
    root: {
      background: "#0078D4",
      padding: "6px 8px",
      borderRadius: 3,
      border: "1px solid blue",

      ":hover": {
        background: "#0078D4 !important",
      },
      ".ms-Button-label": {
        color: "#fff",
      },
    },
    icon: {
      color: "#fff",
    },
    iconHovered: {
      color: "#fff",
    },
  };
  const inActiveBtn: Partial<IButtonStyles> = {
    root: {
      background: "none",
      padding: "6px 8px",
      borderRadius: 3,
      border: "1px solid #0078D4",
      //   ":hover": {
      //     background: "blue !important",
      //   },
      ".ms-Button-label": {
        color: "#0078D4 !important",
      },
    },
    icon: {
      color: "#0078D4 !important",
    },
    iconHovered: {
      color: "#0078D4 !important",
    },
  };
  const Primartbtn: Partial<IButtonStyles> = {
    root: {
      backgroundColor: "#0078D4 !important",
      border: "1px solid #0078D4",
      fontSize: "16px",
      fontWeight: 500,
    },
    rootHovered: {
      backgroundColor: "#0078D4 !important",
      border: "1px solid #0078D4",
    },
  };
  const TextFieldmulti: Partial<ITextStyles> = {
    root: {
      fontWeight: 800,
    },
  };

  const addFeedback = () => {
    console.log({
      isHelpful: feddbacklist.isHelpful == "yes",
      Description: feddbacklist.Description,
    });
    sp.web.lists
      .getByTitle("Feedback")
      .items.add({
        isHelpful: feddbacklist.isHelpful == "yes",
        Description: feddbacklist.Description,
      })
      .then((res: any) => {
        setIsmodal(false);
        feddbacklist.Description = "";
        feddbacklist.isHelpful = "";
        setFeedbacklist({ ...feddbacklist });
      });
  };
  //   useEffect(() => {
  //     const [feddbacklist, setFeedbacklist] = useState({
  //       isHelpful: "",
  //       Description: "",
  //     });
  //   }, [ismodal]);
  return (
    <div>
      <div className={styles.feedbackbtn}>
        <CommandBarButton
          iconProps={{ iconName: "Like" }}
          text="Feedback"
          onClick={() => setIsmodal(true)}
          styles={buttonStyles}
        />
      </div>

      <div className={styles.modalAllignment}>
        <Modal isOpen={ismodal} styles={modalStyles}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h4 style={{ fontSize: "17px", fontWeight: 600 }}>
                Was this page Helpful ?
              </h4>
              <Icon
                iconName="Cancel"
                onClick={() => {
                  setIsmodal(false);
                  feddbacklist.Description = "";
                  feddbacklist.isHelpful = "";
                  setFeedbacklist({ ...feddbacklist });
                }}
                styles={cancelbtn}
              />
            </div>
            <div style={{ display: "flex", gap: "20px", margin: "20px 0px" }}>
              <CommandBarButton
                iconProps={{ iconName: "LikeSolid" }}
                styles={
                  feddbacklist.isHelpful == "yes" ? activeBtn : inActiveBtn
                }
                text="Yes"
                onClick={() => {
                  //   setActiveBtn(!actBtn);
                  feddbacklist.isHelpful = "yes";
                  setFeedbacklist({ ...feddbacklist });
                }}
              />
              <CommandBarButton
                iconProps={{ iconName: "DislikeSolid" }}
                styles={
                  feddbacklist.isHelpful == "no" ? activeBtn : inActiveBtn
                }
                text="No"
                onClick={() => {
                  feddbacklist.isHelpful = "no";
                  setFeedbacklist({ ...feddbacklist });
                }}
              />
            </div>

            {/* <h4>Tell Us more:</h4> */}
            <TextField
              label="Tell us more."
              styles={TextFieldmulti}
              multiline
              rows={4}
              placeholder="Share your experience with us, but please don't include sensitive or personal information"
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(e, val) => {
                feddbacklist.Description = val;
                setFeedbacklist({ ...feddbacklist });
              }}
            />
            <div
              style={{
                margin: "20px 0px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <PrimaryButton
                text="Submit"
                onClick={() => addFeedback()}
                styles={Primartbtn}
              />
              {/* <a href="#">Privacy Policy</a> */}
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
export default Feedback;
