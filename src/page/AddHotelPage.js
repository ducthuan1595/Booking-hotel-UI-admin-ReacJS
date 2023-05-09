import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { request } from "../service";

import styled from './AddHotelPage.module.css';
import { useEffect, useState } from "react";

const AddHotelPage = () => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const allRooms = async() => {
      const res = await request.getAllRoom();
      if(res.data.message === 'ok') {
        console.log('rooms', res.data);
        setRooms(res.data.rooms);
      }
    };
    allRooms();
  }, [])

  const handleChangeInput = (name) => {

  }

  const handleSelectRoom = (name) => {}

  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        <div className={styled.container}>
            <h3 className={styled.title}>Add New Hotel</h3>
          <div className={styled.content}>
            <div className={styled['add-info']}>
            <div className={styled.left}>
              <div className={styled['form-group']}>
                <label>Name</label>
                <input type='text' name='name' placeholder="My hotel" onChange={handleChangeInput.bind(null, 'name')} />
              </div>
              <div className={styled['form-group']}>
                <label>City</label>
                <input type='text' name='city' placeholder="My hotel" onChange={handleChangeInput.bind(null, 'city')} />
              </div>
              <div className={styled['form-group']}>
                <label>Distance from City Center</label>
                <input type='text' name='distance' placeholder="50m" onChange={handleChangeInput.bind(null, 'distance')} />
              </div>
              <div className={styled['form-group']}>
                <label>Description</label>
                <input type='text' name='desc' placeholder="That's great!" onChange={handleChangeInput.bind(null, 'desc')} />
              </div>
              <div className={styled['form-group']}>
                <label>Image</label>
                <input type='text' placeholder="https://pix8.agoda.net/hotelImages" name='image' onChange={handleChangeInput.bind(null, 'image')} />
              </div>
            </div>

            <div className={styled.right}>
              <div className={styled['form-group']}>
                <label>Type</label>
                <input type='text' name='type' placeholder="resort" onChange={handleChangeInput.bind(null, 'type')} />
              </div>
              <div className={styled['form-group']}>
                <label>Address</label>
                <input type='text' name='address' placeholder="25 Edison, Texas" onChange={handleChangeInput.bind(null, 'address')} />
              </div>
              <div className={styled['form-group']}>
                <label>Title</label>
                <input type='text' name='title' placeholder="That's great!" onChange={handleChangeInput.bind(null, 'title')} />
              </div>
              <div className={styled['form-group']}>
                <label>Price</label>
                <input type='text' name='price' placeholder="100" onChange={handleChangeInput.bind(null, 'price')} />
              </div>
              <div className={styled['form-group']}>
                <label>Feature</label>
                <select>
                  <option value='1'>Yes</option>
                  <option value='0'>No</option>
                </select>
              </div>
              </div>
            </div>
              <div className={styled.room}>
                <div>Rooms</div>
                <div className={styled['select-room']}>
                {rooms && rooms.map(room => {
                  return (
                    <div key={room._id} >
                        <input id={room._id} type='checkbox' onClick={handleSelectRoom} />
                        <label htmlFor={room._id}>{room.title}</label>
                    </div>
                  )
                })}
                </div>
            </div>
            <button className='btn btn-large btn-action'>Save</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddHotelPage;