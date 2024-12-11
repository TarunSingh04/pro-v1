import React from "react";
import styles from "./styles.module.scss";
import country_data from "@/app/components/utilities/country_data";

const SingleSelect: React.FC = () => {
  return (
    <div className={styles.selectContainer}>
      <select className={styles.select}>
        <option value="" disabled selected>
          Select Your Country
        </option>
        {country_data.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SingleSelect;
