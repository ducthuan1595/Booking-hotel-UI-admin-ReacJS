import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import styled from "./HomePage.module.css";

import { request } from "../service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HotelPage = () => {
  const [hotels, setHotel] = useState();

  const navigate = useNavigate();

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

  const handleAddHotel = () => {
    navigate('/hotel/form/add-hotel');
  }

  const handleDelete = async(id) => {
    try{
      if(window.confirm('Are you sure?')) {
        const res = await request.deleteHotel(id);
        if(res.data.message !== 'ok') {
          const message = res.data.message;
          alert(message);
        }
        getHotel();
      }
    }catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHotel();
  }, [])

  const handleEdit = async(id) => {
    try{
      const res = await request.getEditHotel(id);
      if(res.data.message === 'ok') {
        navigate(`/hotel/form/${id}`, {state: { hotel: res.data.hotel }});
      }
    }catch(err) {
      console.error(err);
    }
  };

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
                        <td style={{width: '100px'}}>
                          <button onClick={handleEdit.bind(null, item._id)} className='btn btn-edit'>Edit</button>
                          <button onClick={handleDelete.bind(null, item._id)} className='btn btn-destroy'>Delete</button>       
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr><td>No transactions!</td></tr>
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
