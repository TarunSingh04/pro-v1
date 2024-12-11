"use client";
import React, { useState } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import sectionHeaderIcon from "../../assets/sectionNameIcon.svg";
import CompanyProfile from "./settings-company-profile/CompanyProfile";
import Payment from "./settings-payment/Payment";
import SettingsMain from "./settings-main/SettingsMain";

const Settings = () => {
  const [scorenavigateNumber, setscorenavigateNumber] = useState(1);
  const scoreContentChange = (scoreNum: any) => {
    setscorenavigateNumber(scoreNum);
  };
  return (
    <div className={styles.Settings}>
      <div className={styles.sectionHeader}>
        <Image src={sectionHeaderIcon} width={18} height={18} alt="none" />
        <p>
          <span>/</span>Settings
        </p>
      </div>

      <div className={styles.mytasksubHeader}>
        <div className={styles.headerbox1}>
          <h2>Settings</h2>
          <p>Your Gateway to Sustainable Innovation and Global Change !</p>
        </div>
      </div>

      <div className={styles.scorecardBody}>
        <div className={styles.scorecardsubcontbar}>
          <p
            onClick={() => {
              scoreContentChange(1);
            }}
            className={
              scorenavigateNumber === 1
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Settings
          </p>
          <p
            onClick={() => {
              scoreContentChange(2);
            }}
            className={
              scorenavigateNumber === 2
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Payments
          </p>
          <p
            onClick={() => {
              scoreContentChange(3);
            }}
            className={
              scorenavigateNumber === 3
                ? styles.boldScoreSection
                : styles.normalScoreSection
            }
          >
            Company Profile
          </p>
        </div>
        <div className={styles.scorecardBodyContent}>
          {scorenavigateNumber === 1 && <SettingsMain />}
          {scorenavigateNumber === 2 && <Payment />}
          {scorenavigateNumber === 3 && <CompanyProfile />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
