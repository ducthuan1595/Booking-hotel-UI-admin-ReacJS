import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { request } from "../service";

import styled from "./AddHotelPage.module.css";
import { useEffect, useState, useLayoutEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddRoomPage = () => {
  const { params } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [infoRoom, setInfoRoom] = useState();

  useLayoutEffect (() => {
    const getInfoRoom = async() => {
      try{
        const res = await request.getEditRoom(params);
        if(res.data.message === 'ok') {
          setInfoRoom(res.data.room);
          setIsLoading(false);
        }
      }
      catch(err) {
        console.error(err);
      }
    };
    getInfoRoom();
  }, [])
  console.log(infoRoom);

  // setIsLoading(false);
  const [roomNumber, setRoomNumber] = useState([]);
  const [isValid, setIsValid] = useState("");
  const [valueInput, setValueInput] = useState({
    title: infoRoom ? infoRoom.title : '',
    maxPeople: '',
    desc: '',
    price: '',
  });

  const navigate = useNavigate();


  const handleChangeInput = (e, name) => {
    const cpState = { ...valueInput };
    cpState[name] = e.target.value;
    setValueInput(cpState);
  };

  const handleRoomNumber = (e) => {
    const arr = e.target.value.split(',');
    setRoomNumber(arr);
  };

  // const handleSelectHotel = (e, name) => {
  //   if (e.target.checked) {
  //     const cpState = [...roomsValue];
  //     cpState.push(name);
  //     setRoomsValue(cpState);
  //   } else {
  //     const cpState = [...roomsValue];
  //     const newArr = cpState.filter((cp) => cp !== name);
  //     setRoomsValue(newArr);
  //   }
  // };

  const handleSave = async () => {
    try {
      setIsValid("");
      const addRoom = {
        maxPeople: valueInput.maxPeople,
        desc: valueInput.desc,
        price: valueInput.price,
        title: valueInput.title,
        roomNumbers: roomNumber,
        // hotelId: roomsValue
      };
      await request.postAddRoom({ ...addRoom });
      navigate("/room");
    } catch (err) {
      console.log(err);
      setIsValid("Please, complete procedure before registration.");
    }
  };

  // console.log(isLoading);
  // console.log('info', infoRoom);
  console.log('value-input', valueInput);
  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        {!isLoading ? 
        <div className={styled.container}>
          <h3 className={styled.title}>{params === 'add-room' ? 'Add New Room' : 'Edit Room'}</h3>
          <div className={styled.content}>
            <div className={styled["add-info"]}>
              <div className={styled.left}>
                <div className={styled["form-group"]}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={valueInput.title}
                    name="title"
                    placeholder="Kingdom bed"
                    onChange={(e) => handleChangeInput(e, "title")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>Price</label>
                  <input
                    type="number"
                    value={valueInput.price}
                    name="price"
                    placeholder="100"
                    onChange={(e) => handleChangeInput(e, "price")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>Room number</label>
                  <input
                    type="text"
                    value={roomNumber}
                    placeholder="101, 202, 203, ..."
                    name="roomNumber"
                    onChange={handleRoomNumber}
                  />
                </div>
              </div>

              <div className={styled.right}>
                <div className={styled["form-group"]}>
                  <label>Description</label>
                  <input
                    type="text"
                    value={valueInput.desc}
                    name="desc"
                    placeholder="That's great!"
                    onChange={(e) => handleChangeInput(e, "desc")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>MaxPeople</label>
                  <input
                    type="text"
                    value={valueInput.maxPeople}
                    name="maxPeople"
                    placeholder="2"
                    onChange={(e) => handleChangeInput(e, "maxPeople")}
                  />
                </div>
                {/* <div className={styled["form-group"]}>
                  <label>Choose Hotel</label>
                  <div className={styled["select-room"]}>
                    {hotels &&
                      hotels.map((hotel) => {
                        return (
                          <div key={hotel._id}>
                            <input
                              id={hotel._id}
                              type="checkbox"
                              className={styled.checkbox}
                              onClick={(e) => handleSelectHotel(e, hotel._id)}
                            />
                            <label htmlFor={hotel._id}>{hotel.name}</label>
                          </div>
                        );
                      })}
                  </div>
                </div> */}
              </div>
            </div>
            
            <div
              style={{ color: "red", marginBottom: "5px", fontSize: "14px" }}
            >
              {isValid}
            </div>
            <button onClick={handleSave} className="btn btn-large btn-action">
              {params === 'add-room' ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
        : <div>Loading...</div>}
      </div>
    </div>
  );
};

export default AddRoomPage;
