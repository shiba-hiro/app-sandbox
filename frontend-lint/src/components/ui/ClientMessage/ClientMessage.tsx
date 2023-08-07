"use client"

import React from "react";

import styles from "./ClientMessage.module.css";

export const ClientMessage: React.FC = () => {
  // Client components can use useEffect!
  React.useEffect(() => {
    console.log("ClientMessage mounted");
  }, []);

  return (
    <p
      className={styles.message}
    >Client Message</p>
  )
};