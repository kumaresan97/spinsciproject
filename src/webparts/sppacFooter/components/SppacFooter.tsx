import * as React from "react";
import styles from "./SppacFooter.module.scss";
import { ISppacFooterProps } from "./ISppacFooterProps";
import { escape } from "@microsoft/sp-lodash-subset";
import FooterComp from "./Footercomp";

export default class SppacFooter extends React.Component<
  ISppacFooterProps,
  {}
> {
  public render(): React.ReactElement<ISppacFooterProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <FooterComp />;
  }
}
