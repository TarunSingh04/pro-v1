
import styles from './nav.module.scss';
import { PrimaryButton, SecondaryButton } from '../buttons/buttons';

export const Navbar = (props) => {
    return <>
        <div className={styles.navheader}>
            <SecondaryButton onClick={()=>{
                props.onGoBack(0);
            }} label={"Go Back"}/>
            
            <PrimaryButton onClick={props.onSave} label={"Save & Exit"} outlined={true}/>
          </div>
    </>
}