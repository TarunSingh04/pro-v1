import styles from "./inputfields.module.scss";
import { useState, useEffect, useRef } from "react";

export const AnswerInputField = ({ index, label, placeholder, onChange, large = false }) => {
  return (
    <>
      <div
        key={`${index}:text_label`}
        className={`${styles.column}`}
      >
        <p className={styles.text_label}>{label}</p>
        {
          large ? (
            <textarea
              className={styles.textarea}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
            />
          ) : (
            <input
              className={styles.inputfield}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
            />
          )
        }
        
      </div>
    </>
  );
};

export const AnswerRadioButtonField = ({ index, option, selectedOption, onChange }) => {
  return <>
        <div
    key={`${index}:question_choices`}
    className={`${styles.row} ${styles.gap_8}`}
  >
    <input
      type="radio"
      checked={selectedOption == option}
      className={styles.radiobutton}
      value={option}
      onChange={(e) => onChange(e.target.value)}
    />
    <p className={styles.optiontext}>{option}</p>
  </div>
  </>
};


export const AnswerCheckboxField = ({ index, option, selectedOption, onChange }) => {
  return (
    <>
      <div
        key={`${index}:question_choices`}
        className={`${styles.row} ${styles.gap_8}`}
      >
        <input
          type="checkbox"
          checked={selectedOption.includes(option)}
          className={styles.checkbox}
          value={option}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <p className={styles.optiontext}>{option}</p>
      </div>
    </>
  );
}


export const SearchableDropdown = ({
  options,
  label,
  id,
  selectedVal,
  handleChange
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", toggle);
    return () => document.removeEventListener("click", toggle);
  }, []);

  const selectOption = (option) => {
    setQuery(() => "");
    handleChange(option[label]);
    setIsOpen((isOpen) => !isOpen);
  };

  function toggle(e) {
    setIsOpen(e && e.target === inputRef.current);
  }

  const getDisplayValue = () => {
    if (query) return query;
    if (selectedVal) return selectedVal;

    return "";
  };

  const filter = (options) => {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.control}>
        <div className={styles.selected_value}>
          <input
            ref={inputRef}
            type="text"
            value={getDisplayValue()}
            name="searchTerm"
            onChange={(e) => {
              setQuery(e.target.value);
              handleChange(null);
            }}
            onClick={toggle}
          />
        </div>
        <div className={isOpen ? (`${styles.arrow} ${styles.open}`) : (styles.arrow) }></div>
      </div>

      <div className={
        isOpen
          ? styles.option_open
          : styles.option
      }>
        {filter(options).map((option, index) => {
          return (
            <div
              onClick={() => selectOption(option)}
              className={
                selectedVal === option[label]
                  ? styles.option_selected
                  : styles.option_item
              }
              key={`${id}-${index}`}
            >
              {option[label]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

