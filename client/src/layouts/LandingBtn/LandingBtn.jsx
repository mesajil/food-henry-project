import { Link } from "react-router-dom"
import style from './LandingBtn.module.css';

const LandingBtn = () => {
  return (
    <Link to={'/'}>
      <button className={style.circularButton}>
        <span className={style.buttonText}>LX</span>
      </button>
    </Link>
  );
};

export default LandingBtn;