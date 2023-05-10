import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { request } from "../service";

import styled from "./AddHotelPage.module.css";
import { useEffect, useState, useLayoutEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddRoomPage = () => {
  const { params } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [infoRoom, setInfoRoom] = useState(
    params !== "add-room" ? location.state.room : ""
  );
  // useLayoutEffect (() => {
  //   const getInfoRoom = async() => {
  //     try{
  //       const res = await request.getEditRoom(params);
  //       if(res.data.message === 'ok') {
  //         console.log('data', res.data);
  //         setInfoRoom(res.data.room);
  //       }
  //     }
  //     catch(err) {
  //       console.error(err);
  //     }finally{
  //       setIsLoading(false);
  //     }
  //   };
  //   getInfoRoom();
  // }, [])

  // setIsLoading(false);
  const [roomNumber, setRoomNumber] = useState(
    params !== "add-room" ? infoRoom.roomNumbers : []
  );
  const [isValid, setIsValid] = useState("");
  const [valueInput, setValueInput] = useState({
    title: params !== "add-room" ? infoRoom.title : "",
    maxPeople: params !== "add-room" ? infoRoom.maxPeople : "",
    desc: params !== "add-room" ? infoRoom.desc : "",
    price: params !== "add-room" ? infoRoom.price : "",
  });

  const handleChangeInput = (e, name) => {
    const cpState = { ...valueInput };
    cpState[name] = e.target.value;
    setValueInput(cpState);
  };

  const handleRoomNumber = (e) => {
    const arr = e.target.value.split(",");
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
      if (params !== "add-room") {
        const roomId = infoRoom._id;
        await request.postEditRoom({ ...addRoom, roomId });
        return navigate("/room");
      }
      await request.postAddRoom({ ...addRoom });
      navigate("/room");
    } catch (err) {
      console.log(err);
      setIsValid("Please, complete procedure before registration.");
    }
  };

  // console.log(isLoading);
  // console.log('info', infoRoom);
  console.log("value-input", valueInput);
  // if(isLoading){
  //   return (
  //     <div>Loading...</div>
  //   )
  // }
  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        <div className={styled.container}>
          <h3 className={styled.title}>
            {params !== "add-room" ? "Edit Room" : "Add New Room"}
          </h3>
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
              {params !== "add-room" ? "Edit" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddRoomPage;
