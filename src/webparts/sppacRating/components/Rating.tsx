import * as React from "react";
import { Rating, RatingSize, IRatingStyles } from "@fluentui/react";
import { useState, useEffect } from "react";
import { PageContext } from "@microsoft/sp-page-context";
import "./style.css";

const RatingComp = (props: any) => {
  const [rate, setRate] = useState({
    ratingValue: 0,
    pageId: "",
    Title: "",
  });
  // Set the rating value for the current page
  // const pageContext: PageContext = props.context.pageContext;
  // const pageId: string = pageContext.listItem.id.toString();
  //   const pageItemId: number = pageContext.legacyPageContext?.listItem?.Id;

  const onRatingChange = async (ev, rating) => {
    console.log(rating);

    // this.setState({ ratingValue: rating });
    rate.ratingValue = rating;
    setRate({ ...rate });

    const pageContext: PageContext = props.context.pageContext;

    const pageId: string = pageContext.listItem.id.toString();

    const currentPageUrl: string = window.location.href;
    console.log("Current Page URL:", currentPageUrl);

    // Get current page title (or page name)
    const pageTitle: string = document.title;
    console.log("Page Title:", pageTitle);

    const existingRating = await props.sp.web.lists
      .getByTitle("RatingTest")
      .items.filter(`pageId eq '${pageId}'`)
      .get();

    if (existingRating.length > 0) {
      // Update the existing rating
      await props.sp.web.lists
        .getByTitle("RatingTest")
        .items.getById(existingRating[0].Id)
        .update({
          Rating: rating,
        });
    } else {
      // Create a new rating entry
      await props.sp.web.lists.getByTitle("RatingTest").items.add({
        Title: pageTitle,
        pageId: parseInt(pageId),
        Rating: rating,
      });
    }
  };
  const rating: Partial<IRatingStyles> = {
    root: {
      ".ms-RatingStar-front": {
        color: " #ffd700 !important",
      },
    },
  };

  return (
    <div>
      <p>Rate this Page</p>
      <Rating
        max={5}
        styles={rating}
        size={RatingSize.Large}
        allowZeroStars
        ariaLabel="Large stars"
        ariaLabelFormat="{0} of {1} stars"
        onChange={onRatingChange}
      />
    </div>
  );
};
export default RatingComp;
