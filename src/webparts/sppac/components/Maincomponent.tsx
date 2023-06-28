import * as React from "react";
import styles from "./Sppac.module.scss";
import "./style.css";
import { Icon, TextField } from "@fluentui/react";
import Loader from "./Loader";
Icon;
let Facility = [];
export const Maincomponent = (props) => {
  const [datas, setDatas] = React.useState([]);
  const [masterdatas, setMasterdatas] = React.useState([]);
  const [input, setInput] = React.useState("");
  const getHomeConfig = () => {
    props.sp.web.lists
      .getByTitle("HomeConfig")
      .items.get()
      .then((res: any) => {
        console.log(res);

        Facility = [];
        res.forEach((val) => {
          Facility.push({
            Title: val.Title ? val.Title : "",
            Url: val.Url ? val.Url : "",
            Description: val.Description ? val.Description : "",
          });
        });
        console.log(Facility);
        Facility.length && setDatas(Facility);
        setMasterdatas(Facility);
      });
  };
  const SearchFilter = (e, val) => {
    let values = val;
    // setInput(values);

    const search = masterdatas.filter((val) =>
      val.Title.toLowerCase().includes(values.toLowerCase())
    );

    setDatas(search);
  };
  React.useEffect(() => {
    getHomeConfig();
  }, []);
  return (
    <div>
      <div className={styles.parentsearch}>
        <TextField
          className={styles.searchInput}
          placeholder="Search"
          onChange={(e, val) => SearchFilter(e, val)}
        />
        <Icon iconName="Search" className={styles.Search} />
      </div>

      <div className={styles.boxes}>
        {datas.map((val) => (
          <a className={styles.box} href={val.Url.Url} target="_blank">
            <h4>{val.Title}</h4>
            <p>{val.Description}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
