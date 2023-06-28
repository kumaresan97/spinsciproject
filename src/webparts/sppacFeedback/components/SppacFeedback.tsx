import * as React from "react";
import styles from "./SppacFeedback.module.scss";
import { ISppacFeedbackProps } from "./ISppacFeedbackProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import Feedback from "./Feedback";

export default class SppacFeedback extends React.Component<
  ISppacFeedbackProps,
  {}
> {
  constructor(prop: ISppacFeedbackProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ISppacFeedbackProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Feedback context={this.props.context} sp={sp} />;
  }
}
