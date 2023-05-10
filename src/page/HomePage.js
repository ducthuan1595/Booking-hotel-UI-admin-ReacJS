import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import styled from "./HomePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCartShopping,
  faMoneyCheckDollar,
  faScaleBalanced,
} from "@fortawesome/free-solid-svg-icons";


import { request } from "../service";
import { useCallback, useEffect, useMemo, useState } from "react";

const HomePage = () => {
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const requestTransaction = async() => {
      const quantity = 8;
      const res = await request.getAllTransaction(quantity);
      if(res.data.message === 'ok') {
        console.log('data', res.data);
        setTransactions(res.data.books);
      }
    }
    requestTransaction();
  }, []);

    useMemo(() => {
      const totalPrice = transactions.reduce((acc, curr) => {
        return acc + curr.price;
      }, 0);
      setTotalPrice(totalPrice)
      const users = transactions.map(item => item.userId);
      const userId = users.map(user => user._id);
      let lgUser = 1;
      for(let i = 1; i < userId.length; i++) {
        let j = 0;
        for(j = 0; j < i; j++) if(userId[i] === userId[j]) break;
        if(i === j) lgUser++;
      }
      setAccounts(lgUser)
    }, [transactions])

  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        <div className={styled.container}>
          <div className={styled.overview}>
            <div className={styled.item}>
              <div>USERS</div>
              <div className={styled.total}>{accounts ? accounts : 0}</div>
              <div className={styled.icon}>
                <FontAwesomeIcon icon={faUser} beat style={{ color: '#e5415f', border: '3px solid #ffcccc' }} />
              </div>
            </div>
            <div className={styled.item}>
              <div>ORDERS</div>
              <div className={styled.total}>{transactions ? transactions.length : 0}</div>
              <div className={styled.icon}>
                <FontAwesomeIcon icon={faCartShopping} beat style={{ color: '#e6c064', border: '3px solid #f8edd2' }} />
              </div>
            </div>
            <div className={styled.item}>
              <div>EARNINGS</div>
              <div className={styled.total}>${totalPrice ? totalPrice : 0}</div>
              <div className={styled.icon}>
                <FontAwesomeIcon icon={faMoneyCheckDollar} beat style={{ color: '#148a14', border: '3px solid #cce6cc' }} />
              </div>
            </div>
            <div className={styled.item}>
              <div>BALANCE</div>
              <div className={styled.total}>${totalPrice ? totalPrice : 0}</div>
              <div className={styled.icon}>
                <FontAwesomeIcon icon={faScaleBalanced} beat style={{ color: '#983098', border: '3px solid #e6cce6' }} />
              </div>
            </div>
          </div>
          <div className={styled.content}>
            <div className={styled.title}>Latest Transactions</div>
            <table>
              <thead>
              <tr>
                <th>#</th>
                <th>ID</th>
                <th>User</th>
                <th>Hotel</th>
                <th>Room</th>
                <th>Date</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody>
                {transactions ? transactions.map((item, index) => {
                  const rooms = item.rooms.map(room => {
                    return room.roomNumber;
                  }).flat().toString();
                  let start = new Date(item.startDate);
                  let end = new Date(item.endDate);
                  let ys = new Intl.DateTimeFormat("en", {
                    year: "numeric",
                  }).format(start);
                  let ye = new Intl.DateTimeFormat("en", {
                    year: "numeric",
                  }).format(end);
                  let ms = new Intl.DateTimeFormat("en", {
                    month: "numeric",
                  }).format(start);
                  let me = new Intl.DateTimeFormat("en", {
                    month: "numeric",
                  }).format(end);
                  let ds = new Intl.DateTimeFormat("en", {
                    day: "2-digit",
                  }).format(start);
                  let de = new Intl.DateTimeFormat("en", {
                    day: "2-digit",
                  }).format(end);
                  const startDate=`${ms}/${ds}/${ys}`;
                  const endDate=`${me}/${de}/${ye}`;
                  return (
              <tr key={item._id}>
                <td>{index+1}</td>
                <td>{item._id}</td>
                <td>{item.userId.fullName}</td>
                <td>{item.hotelId.name}</td>
                <td>{rooms}</td>
                <td>{startDate}-{endDate}</td>
                <td>{item.price}</td>
                <td>{item.payment}</td>
                <td><button className={styled.btn} style={{backgroundColor: item.status.includes('booked') ? '#54c14f' : '#dcbd65'}} >{item.status}</button></td>
              </tr>
                  )
                }) : <div>No transactions!</div>}
              </tbody>
            </table>
              <div className={styled.tableFoot}>1-{transactions ? transactions.length : 0} of 8</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
