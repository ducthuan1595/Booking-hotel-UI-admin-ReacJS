import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import styled from "./HomePage.module.css";

import { request } from "../service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HotelPage = () => {
  const [hotels, setHotel] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const getHotel = async () => {
      try {
        const res = await request.getAllHotel();
        if (res.data.message === "ok") {
          setHotel(res.data.hotels)
        }
      } catch (err) {
        console.log(err);
      }
    };
    getHotel();
  }, []);

  const handleAddHotel = () => {
    navigate('/add-hotel');
  }

  const handleDelete = async(id) => {
    try{
      const res = await request.deleteHotel(id)
    }catch(err) {
      console.log(err);
    }
  };

  const handleEdit = (id) => [

  ]

  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        <div className={styled.container}>
          <div className={styled.content}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
            <div className={styled.title}>Hotels List</div>
            <button onClick={handleAddHotel} className='btn btn-action'>Add Hotel</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>City</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {hotels ? (
                  hotels.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.name}</td>
                        <td>{item.type}</td>
                        <td>{item.title}</td>
                        <td>{item.city}</td>
                        <td>
                          <button onClick={handleEdit.bind(null, item._id)} className='btn btn-edit'>Edit</button>
                          <button onClick={handleDelete.bind(null, item._id)} className='btn btn-destroy'>Delete</button>       
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>No transactions!</div>
                )}
              </tbody>
            </table>
            <div className={styled.tableFoot}>
              1-{hotels ? hotels.length : 0}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelPage;
