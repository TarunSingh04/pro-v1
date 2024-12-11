"use client";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import EditProfile from "../../../assets/upload.png";
import country_data from "../../../utilities/country_data";
import sector_data from "../../../utilities/sectors_data";
import utility_data from "../../../utilities/utility_data";
import utility_sector_data from "../../../utilities/utility_sector";
import certificate_data from "../../../utilities/certificate_data";
import { FaExclamationCircle } from "react-icons/fa";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";
import DragFile from "./drag-and-drop/Dragfile";
// import Pricing from "../pricing/Pricing";
import { useRouter } from "next/navigation";
import LanguageSelector from "@/app/components/utilities/components/language-selector/LanguageSelector";
import { FaChevronLeft } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { MdClose, MdOutlineFileUpload } from "react-icons/md";
import MultiSelect from "./multi-select/MultiSelect";
import SingleSelect from "./single-select/SingleSelect";
import SearchSelect from "./search-select/SearchSelect";
import uploader from "../../../assets/uploaderCertificate.svg";

interface QuestionaireProps {
  questionaireStep: number; // Current state value (1-based index)
  setquestionaireState: React.Dispatch<React.SetStateAction<number>>; // Function to update state
  onNext: () => void;
}

const fileTypes = ["PDF", "DOC"];

const Questionaire: React.FC<QuestionaireProps> = ({
  questionaireStep,
  setquestionaireState,
  onNext,
}) => {
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedSector, setSelectedSector] = useState<any>([]);
  const [selectedUtility, setSelectedUtility] = useState<any>([]);
  const [selectedUtilitySector, setselectedUtilitySector] = useState<any>([]);
  const [utility_datas, setutility_datas] = useState<any>([]);
  const [certificates, setcertificates] = useState<any>([]);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [addCertificatePopUp, setaddCertificatePopUp] = useState(false);
  const [file, setFile] = useState<any>(null);
  const router = useRouter();
  const [continuePopUp, setcontinuePopUp] = useState(false);
  const [utiltiyPopUp, setutilityPopUp] = useState(false);
  const [newCertificateData, setnewCertificateData] = useState([]);
  const [loaderpopUp, setloaderpopUp] = useState(false);
  const [Epds, setEpds] = useState<any>([]);
  const [otherCertificates, setotherCertificates] = useState<any>([])
  const [SelectISO, setSelectISO] = useState<any>([]);
  const [sectors, setsectors] = useState<any>([])
  const closeutilityPopUp = () => {
    setutilityPopUp(false);
  };

  const openutilityPopUp = () => {
    setutilityPopUp(true);
  };

  const closeCertificatePopUp = () => {
    setaddCertificatePopUp(false);
  };

  const openCertificatePopUp = () => {
    setaddCertificatePopUp(true);
  };

  const closeContinuePopUp = () => {
    setcontinuePopUp(false);
  };

  const openContinuePopUp = () => {
    setcontinuePopUp(true);
  };

  const onFileChange = (files: any) => {
    console.log(files);
    setFile(files);
  };

  useEffect(() => {
    if (selectedCountry && selectedUtilitySector.length > 0) {
      console.log(selectedCountry);
      console.log(selectedUtilitySector);
      const filteredUtilities = utility_data
        .filter((utility) => {
          // First filter by country
          return utility.countryCode === selectedCountry.value;
        })
        .filter((utility) => {
          // Then filter by any one of the sector values in selectedUtilitySector
          return selectedUtilitySector.some(
            (sector: any) => sector.value === utility.sectorName
          );
        });
      console.log(filteredUtilities);
      setutility_datas(filteredUtilities);
    } else {
      setutility_datas([]);
    }
  }, [selectedCountry, selectedUtilitySector]);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage("");
  };

  const nextQuestionaire = () => {
    // setquestionaireState(questionaireStep + 1);
    onNext();
  };

  const previousQuestionaire = () => {
    setquestionaireState(questionaireStep - 1);
  };

  const submitQuestionaire = () => {
    console.log("questionaire submitted");
    router.push("/pages/pricing");
  };

  const handleChange = (file: any) => {
    setFile(file);
  };

  const navigateTo = ()=>{
    setloaderpopUp(true);
    router.push("/pages/dashboard")
  }
  return (
    <div className={styles.sidenavQuestion}>
      <div className={styles.questionaire1}>
        <li className={styles.stepcounthead}>
          <span>
            <GoDotFill />
          </span>
          0{questionaireStep}
        </li>
        {questionaireStep === 1 && (
          <div className={styles.question1content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Company Details</p>
              <p className={styles.loginsubHead}>
                Please complete all fields marked with an asterisk (*)
              </p>
            </div>
            <div className={styles.wrapperInputBox1}>
              <p>Company Name*</p>
              <input type="text" placeholder="Enter Your Company Name" />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Registration Name*</p>
              <input type="text" placeholder="Enter Your Registration " />
            </div>
            <div className={styles.wrapperInputBox1}>
              <p>Company Registration Number*</p>
              <input type="text" placeholder="Enter Your Registration Number" />
            </div>

            <div className={styles.ImageContainer}>
              <Image
                src={selectedImage || EditProfile} // Conditionally render the uploaded image or the default
                width={80}
                height={80}
                alt="profile"
                className={styles.ProfileImage}
              />
              <div className={styles.ImageButtons}>
                <label className={styles.uploadButton}>
                  <MdOutlineFileUpload className={styles.uploadIcon} />
                  UPLOAD LOGO
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </label>
                <button
                  className={styles.removeButton}
                  onClick={handleRemoveImage}
                  disabled={!selectedImage}
                >
                  REMOVE LOGO
                </button>
              </div>
            </div>
          </div>
        )}

        {questionaireStep === 2 && (
          <div className={styles.question2content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Account Information</p>
              <p className={styles.loginsubHead}>
                Please complete all fields marked with an asterisk (*)
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Select Country*</p>

              {/* <Select
                value={selectedCountry}
                onChange={setSelectedCountry}
                options={country_data}
                isSearchable
                className={styles.selectors}
              /> */}
              <SingleSelect />
            </div>

            <div className={styles.wrapperInputBox}>
              <p>Select Sectors*</p>
              <MultiSelect
                placeholder="Select Your Sectors"
                data={sector_data}
                onChangeSelected={setSelectedSector}
              />
            </div>
          </div>
        )}

        {questionaireStep === 3.1 && (
          <div className={styles.question2content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Utility Details</p>
              <p className={styles.loginsubHead}>
                Please provide detailed information about your company&apos;s
                utilities, including multiple utilities and sectors that apply
                to your business.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utilities sector</p>
              <SearchSelect
                placeholder="Select Utility Sector"
                tagkeep={true}
              />
            </div>
          </div>
        )}

        {questionaireStep === 3.2 && (
          <div className={styles.question2content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Utility Details</p>
              <p className={styles.loginsubHead}>
                Please provide detailed information about your company&apos;s
                utilities, including multiple utilities and sectors that apply
                to your business.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility Categories & Providers*</p>
              <SearchSelect placeholder="Accounting" tagkeep={false} />
              <div className={styles.spacer}></div>
              <div className={styles.spacer}></div>
              <SearchSelect
                placeholder="Advertisement Companies"
                tagkeep={false}
              />
              <div className={styles.spacer}></div>
              <div className={styles.spacer}></div>
              <SearchSelect placeholder="Basic Utilities" tagkeep={false} />
              <div className={styles.spacer}></div>
              <div className={styles.spacer}></div>
              <div className={styles.certificateLinks}>
                Missing your utility?{" "}
                <span onClick={openutilityPopUp}>+ ADD HERE</span>
              </div>
            </div>
          </div>
        )}

        {questionaireStep === 4 && (
          <div className={styles.question1content}>
            <div className={styles.loginHeader}>
              <p className={styles.loginHead}>Certificate Details</p>
              <p className={styles.loginsubHead}>
                Please provide detailed information about your company&apos;s
                certifications. Ensure to upload relevant documentation for
                accuracy and authenticity.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Certificates*</p>
              <MultiSelect
                placeholder="Select Certificates"
                data={certificate_data}
                onChangeSelected={setcertificates}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Other Certificates*</p>
              <MultiSelect
                placeholder="Select Other Certificates"
                data={certificate_data}
                onChangeSelected={otherCertificates}
              />
            </div>

            <p className={styles.certificateLinks}>
              Can&apos;t find your certificate?{" "}
              <span onClick={openCertificatePopUp}>+ ADD HERE</span>
            </p>

            <div className={styles.wrapperInputBox}>
              <p>ISO*</p>
              <MultiSelect placeholder="Select ISO" data={certificate_data} onChangeSelected={setSelectISO}/>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>EPDs*</p>
              <MultiSelect placeholder="Select EPDs" data={certificate_data}  onChangeSelected={setEpds}/>
            </div>
            <p className={styles.certificateLinks}>
              Don&apos;t have a certificate?{" "}
              <span onClick={openContinuePopUp}>Skip this step</span>
            </p>
          </div>
        )}

        {questionaireStep < 4 && (
          <div className={styles.btnBox}>
            <button
              className={styles.continuebtn}
              onClick={() => {
                onNext();
              }}
            >
              NEXT STEP
            </button>
          </div>
        )}

        {questionaireStep === 4 && (
          <div className={styles.btnBox}>
            <button className={styles.continuebtn} onClick={()=>{navigateTo()}}>
              GET STARTED
            </button>
          </div>
        )}
      </div>
      {/* <Pricing/> */}

      {addCertificatePopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeCertificatePopUp}
                />
              </div>
              <h2 className={styles.title}>Add Your Certificate</h2>
              <p className={styles.description}>
                Please upload the certificate and provide necessary details.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Certificate Name</p>
              <input type="text" placeholder="Enter Certificate Name" />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Select Country</p>
              <SingleSelect />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Website</p>
              <input type="text" placeholder="Paste Website Url" />
            </div>
            <DragFile onFileChange={onFileChange} />
            <button className={styles.button}>SAVE CERTIFICATE</button>
          </div>
        </div>
      )}

      {utiltiyPopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont1}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeutilityPopUp}
                />
              </div>
              <h2 className={styles.title}>Add Your Utility</h2>
              <p className={styles.description}>
                Please provide details about the utility.
              </p>
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility Sector</p>
              <MultiSelect
                placeholder="Select Your Sectors"
                data={sector_data}
                onChangeSelected={setsectors}
              />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Utility name</p>
              <input type="text" placeholder="Enter Certificate Name" />
            </div>
            <div className={styles.wrapperInputBox}>
              <p>Website</p>
              <input type="text" placeholder="Paste Website Url" />
            </div>
            <button className={styles.button}>SAVE UTILITY</button>
          </div>
        </div>
      )}

      {continuePopUp && (
        <div className={styles.container}>
          <div className={styles.boxCont}>
            <div className={styles.subBox}>
              <div className={styles.closeheader}>
                <MdClose
                  className={styles.closeIcon}
                  onClick={closeContinuePopUp}
                />
              </div>
              <h2 className={styles.title}>Would you like to proceed?</h2>
              <p className={styles.description}>
                Skipping the process may lead to lower score, Are you sure you
                want to proceed?
              </p>
            </div>

            <div className={styles.buttoncontpopup}>
              <button className={styles.button1} onClick={closeContinuePopUp}>
                GO BACK
              </button>
              <button className={styles.button} onClick={()=>{navigateTo()}}>CONTINUE</button>
            </div>
          </div>
        </div>
      )}

      {
        loaderpopUp && (
          <div className={styles.container}>
          <div className={styles.loader}></div>
          </div>
        )
      }
    </div>
  );
};

export default Questionaire;
