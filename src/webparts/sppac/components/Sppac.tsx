import * as React from "react";
import styles from "./Sppac.module.scss";
import { Maincomponent } from "./Maincomponent";

import { ISppacProps } from "./ISppacProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";

export default class Sppac extends React.Component<ISppacProps, {}> {
  constructor(prop: ISppacProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ISppacProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Maincomponent context={this.props.context} sp={sp} />;
  }
}
