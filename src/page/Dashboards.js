import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import styled from "./HomePage.module.css";

import { request } from "../service";
import { useCallback, useEffect, useMemo, useState } from "react";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const requestTransaction = async() => {
      // const quantity = 8;
      const res = await request.getAllTransaction();
      if(res.data.message === 'ok') {
        console.log('data', res.data);
        setTransactions(res.data.books);
      }
    }
    requestTransaction();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        <div className={styled.container}>
  
          <div className={styled.content}>
            <div className={styled.title}>Lists Transactions</div>
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
              <div className={styled.tableFoot}>‹ 1-{transactions ? transactions.length : 0} ›</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
