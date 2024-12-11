import styles from "./buttons.module.scss";

export const PrimaryButton = ({ onClick, label, outlined = false}) => {
  return (
    <>
      <div className={styles.center}>
          <button className={outlined?styles.primary_button_outlined:styles.primary_button} onClick={onClick}>{label}</button>
      </div>
    </>
  );
};


export const SecondaryButton = ({onClick, label}) => {
    return (
        <>
        <button
              onClick={onClick}
              className={styles.secondary_button}
              style={{ width: "100px", height: "35px" }}
            >
                {label}
        </button>
        </>
    );
};