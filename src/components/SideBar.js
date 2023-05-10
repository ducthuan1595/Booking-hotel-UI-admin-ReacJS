import styled from "./SideBar.module.css";
import {
  faTableColumns,
  faUser,
  faHotel,
  faRightFromBracket,
  faBed,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { context } from "../store/store";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { setAdmin } = useContext(context);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    navigate('/');
  }

  return (
    <>
      <div className={styled.sidebar}>
        <div className={styled.items}>
          <div>Main</div>
          <Link to='/dashboard' className={styled.item}>
            <FontAwesomeIcon icon={faTableColumns} className={styled.icon} />
            <span>Dashboard</span>
          </Link>
        </div>
        <div className={styled.items}>
          <div>Lists</div>
          <Link to='/' className={styled.item}>
            <FontAwesomeIcon icon={faUser} className={styled.icon} />
            <span>Users</span>
          </Link>
          <Link to='/hotel' className={styled.item}>
            <FontAwesomeIcon icon={faHotel} className={styled.icon} />
            <span>Hotel</span>
          </Link>
          <Link to='/room' className={styled.item}>
            <FontAwesomeIcon icon={faBed} className={styled.icon} />
            <span>Room</span>
          </Link>
          <Link to='/transactions' className={styled.item}>
            <FontAwesomeIcon
              icon={faMoneyBillTransfer}
              className={styled.icon}
            />
            <span>Transactions</span>
          </Link>
        </div>
        <div className={styled.items}>
          <div>New</div>
          <Link to='/hotel/form/add-hotel' className={styled.item}>
            <FontAwesomeIcon icon={faHotel} className={styled.icon} />
            <span>New Hotel</span>
          </Link>
          <Link to='/room/form/add-room' className={styled.item}>
            <FontAwesomeIcon icon={faBed} className={styled.icon} />
            <span>New Room</span>
          </Link>
        </div>
        <div className={styled.items}>
          <div>User</div>
          <div className={styled.item} >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              className={styled.icon}
            />
            <button onClick={handleLogout} className={styled.logout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
