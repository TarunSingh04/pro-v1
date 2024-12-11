// import React, { useState, ChangeEvent } from "react";
// import { X } from "lucide-react";
// import styles from "./styles.module.scss";

// interface Option {
//   value: string;
//   label: string;
// }

// interface MultiSelectProps {
//   placeholder: string;
//   data: Option[]; // Expect an array of { label: string; value: string }
// }

// const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder, data }) => {
//   const [selected, setSelected] = useState<string[]>([]);
//   const [options] = useState<Option[]>([
//     {
//       value: "activities-financial",
//       label: "Activities auxiliary to financial service",
//     },
//     {
//       value: "activities-insurance",
//       label: "Activities auxiliary to insurance",
//     },
//     {
//       value: "activities-pension",
//       label: "Activities auxiliary to pension funding",
//     },
//     { value: "financial-service", label: "Financial service activities" },
//     { value: "insurance", label: "Insurance activities" },
//     { value: "pension", label: "Pension funding" },
//   ]);

//   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     if (value && !selected.includes(value)) {
//       setSelected([...selected, value]);
//     }
//     e.target.value = "";
//   };

//   const removeTag = (tagToRemove: string) => {
//     setSelected(selected.filter((tag) => tag !== tagToRemove));
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.selectContainer}>
//         <select
//           onChange={handleChange}
//           className={styles.select}
//           defaultValue=""
//         >
//           <option value="" disabled>
//             {placeholder}
//           </option>
//           {data.map((option: any) => (
//             <option key={option.value} value={option.label}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className={styles.tagsGrid}>
//         {selected.map((tag, index) => (
//           <div key={index} className={styles.tag}>
//             <span className={styles.tagText}>
//               {tag.length > 16 ? tag.substring(0, 16) + "..." : tag}
//             </span>
//             <X className={styles.closeIcon} onClick={() => removeTag(tag)} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MultiSelect;
import React, { useState, ChangeEvent } from "react";
import { X } from "lucide-react";
import styles from "./styles.module.scss";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  placeholder: string;
  data: Option[]; // Expect an array of { label: string; value: string }
  onChangeSelected: (selectedValues: string[]) => void; // Callback to update the parent component's state
}

const MultiSelect: React.FC<MultiSelectProps> = ({ placeholder, data, onChangeSelected }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value && !selected.includes(value)) {
      const updatedSelected = [...selected, value];
      setSelected(updatedSelected);
      onChangeSelected(updatedSelected); // Notify parent about the state change
    }
    e.target.value = "";
  };

  const removeTag = (tagToRemove: string) => {
    const updatedSelected = selected.filter((tag) => tag !== tagToRemove);
    setSelected(updatedSelected);
    onChangeSelected(updatedSelected); // Notify parent about the state change
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <select
          onChange={handleChange}
          className={styles.select}
          defaultValue=""
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {data.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.tagsGrid}>
        {selected.map((tag, index) => (
          <div key={index} className={styles.tag}>
            <span className={styles.tagText}>
              {tag.length > 16 ? tag.substring(0, 16) + "..." : tag}
            </span>
            <X className={styles.closeIcon} onClick={() => removeTag(tag)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
