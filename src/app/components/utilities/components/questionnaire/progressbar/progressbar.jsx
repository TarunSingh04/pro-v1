import LinearProgress from "@mui/material/LinearProgress";
import styles from "./progressbar.module.scss";
import { Stepper, Step, StepLabel, StepContent } from "@mui/material";

export const ProgressBar = ({ progress, label }) => {
    return <>
        <div
            key={label}
              style={{
                width: "100%",
              }}
            >
              <LinearProgress variant="determinate" value={progress} />

              {/* Footer Text */}
              <p className={styles.footer_text}>{label}</p>
            </div>
    </>
}

export const SideStepBar = ({ activeStep = 0, STEPS}) => {
    return <>
        <div className={styles.sidenav}>
          <div className={styles.sidenav_header}>
            <p
              className={styles.sidenav_header_text}
              style={{ color: "#7c7c7c", paddingRight: "5px" }}
            >
              IMPAKTER
            </p>
            <p
              className={styles.sidenav_header_text}
              style={{ color: "#1492ef" }}
            >
              PRO
            </p>
          </div>

          {/* Stepper */}
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              "& .MuiStepConnector-line": {
                minHeight: "60px",
              },
              "& .Mui-disabled .MuiStepIcon-root": {
                color: "transparent",
                border: "1px solid #e7e7e7",
                borderRadius: "50%",
              },
            }}
          >
            {STEPS.map((step, index) => {
              return (
                <Step key={`${index}-step`} expanded={true}>
                  <StepLabel
                    color="#1492ef"
                    icon={" "}
                    className={styles.questiontext}
                  >
                    {step.heading}
                  </StepLabel>
                  <StepContent className={styles.optiontext}>
                    {step.sub_heading}
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
        </div>
    </>
}