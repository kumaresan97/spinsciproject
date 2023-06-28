import * as React from "react";
import styles from "./SppacRating.module.scss";
import { ISppacRatingProps } from "./ISppacRatingProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { sp } from "@pnp/sp/presets/all";
import Rating from "./Rating";

export default class SppacRating extends React.Component<
  ISppacRatingProps,
  {}
> {
  constructor(prop: ISppacRatingProps) {
    super(prop);
    sp.setup({
      spfxContext: this.props.context,
    });
  }
  public render(): React.ReactElement<ISppacRatingProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
    } = this.props;

    return <Rating context={this.props.context} sp={sp} />;
  }
}
