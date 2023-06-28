import * as moment from "moment";
import * as React from "react";
const currentYerar = moment().year();
const FooterComp = () => {
  return (
    <div>
      <p>
        &copy;{" "}
        {`${currentYerar} interSystems Corporation, Cambridge, MA, All rights
        Reserved.`}
      </p>
      {/* <p>Content date/time: {moment().format("MM-DD-YYYY HH:mm:ss")}</p> */}
    </div>
  );
};
export default FooterComp;
