import styles from "./question.module.scss";
import { useState } from "react";
import {
  AnswerInputField,
  AnswerRadioButtonField,
  AnswerCheckboxField,
} from "../inputfields/inputfields";


export const SubQuestion = ({ index, question, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(
    question.choice_type == "radio"
      ? null
      : Array(question.choices.length).fill(false)
  );

  const handleCheckboxChange = (option) => {
    if (selectedOption.includes(option)) {
      setSelectedOption(selectedOption.filter((item) => item !== option));
    } else {
      setSelectedOption([...selectedOption, option]);
    }
  };

  return (
    <>
      <div key={`${index}:questions`}>
          <p className={styles.subquestiontext}>{question.question}</p>
        <div
          className={
            question.choice_orientation == "horizontal"
              ? styles.option_container_horizontal
              : styles.option_container
          }
        >
          {question.choices.map((option, choiceIndex) => {
            if (question.choice_type == "radio") {
              return (
                <AnswerRadioButtonField
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    setSelectedOption(option);
                  }}
                />
              );
            } else {
              return (
                <AnswerCheckboxField
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    handleCheckboxChange(option);
                  }}
                />
              );
            }
          })}
        </div>

      
        {/* File */}

        {/* Input Field */}
        {question.text_labels.map((text_label, labelIndex) => {
          return (
            <AnswerInputField
              index={labelIndex}
              label={text_label.label}
              placeholder={text_label.placeholder}
            />
          );
        })}
      </div>
    </>
  );
};


export const Question = ({ index, question, onChange }) => {
  const [selectedOption, setSelectedOption] = useState(
    question.choice_type == "radio"
      ? null
      : Array(question.choices.length).fill(false)
  );

  const handleCheckboxChange = (option) => {
    if (selectedOption.includes(option)) {
      setSelectedOption(selectedOption.filter((item) => item !== option));
    } else {
      setSelectedOption([...selectedOption, option]);
    }
  };

  return (
    <>
      <div key={`${index}:questions`}>
        
          <p className={styles.questiontext}>{question.question}</p>
        

        <div
          className={
            question.choice_orientation == "horizontal"
              ? styles.option_container_horizontal
              : styles.option_container
          }
        >
          {question.choices.map((option, choiceIndex) => {
            if (question.choice_type == "radio") {
              return (
                <AnswerRadioButtonField
                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    setSelectedOption(option);
                  }}
                />
              );
            } else {
              return (
                <AnswerCheckboxField

                  index={choiceIndex}
                  option={option}
                  selectedOption={selectedOption}
                  onChange={(option) => {
                    handleCheckboxChange(option);
                  }}
                />
              );
            }
          })}
        </div>

        {/* Sub Question*/}
        {question.sub_questions
          ? question.sub_questions.map((sub_question, subIndex) => {
              return (
                <SubQuestion
                  key={`${subIndex}-${sub_question}`}
                  index={subIndex}
                  question={sub_question}
                  onChange={() => {}}
                />
              );
            })
          : null}
        {/* File */}

        {/* Input Field */}
        {question.text_labels.map((text_label, labelIndex) => {
          return (
            <AnswerInputField
              large={text_label.large}
              index={labelIndex}
              label={text_label.label}
              placeholder={text_label.placeholder}
            />
          );
        })}
      </div>
    </>
  );
};

