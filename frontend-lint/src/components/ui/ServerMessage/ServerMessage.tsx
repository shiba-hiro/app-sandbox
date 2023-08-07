import React from "react";

import styles from "./ServerMessage.module.css";

export const ServerMessage: React.FC = () => {
  // Cannot use useEffect in server components!
  //
  // React.useEffect(() => {
  //   console.log("ServerMessage mounted");
  // }, []);

  return (
    <p
      className={styles.message}
    >Server Message</p>
  )
};