import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { request } from "../service";

import styled from "./AddHotelPage.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddHotelPage = () => {
  const [rooms, setRooms] = useState();
  const [featureValue, setFeatureValue] = useState(1);
  const [roomsValue, setRoomsValue] = useState([]);
  const [isValid, setIsValid] = useState('');
  const [valueInput, setValueInput] = useState({
    name: "",
    city: "",
    address: "",
    image: "",
    title: "",
    type: "",
    desc: "",
    distance: "",
    price: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const allRooms = async () => {
      const res = await request.getAllRoom();
      if (res.data.message === "ok") {
        console.log("rooms", res.data);
        setRooms(res.data.rooms);
      }
    };
    allRooms();
  }, []);

  const handleChangeInput = (e, name) => {
    const cpState = { ...valueInput };
    cpState[name] = e.target.value;
    setValueInput(cpState);
  };

  const handleSelect = (e) => {
    setFeatureValue(e.target.value);
  };

  const handleSelectRoom = (e, name) => {
    if (e.target.checked) {
      const cpState = [...roomsValue];
      cpState.push(name);
      setRoomsValue(cpState);
    } else {
      const cpState = [...roomsValue];
      const newArr = cpState.filter((cp) => cp !== name);
      setRoomsValue(newArr);
    }
  };

  const handleSave = async () => {
    try {
      setIsValid('')
      const addHotel = {
        name: valueInput.name,
        city: valueInput.city,
        address: valueInput.address,
        desc: valueInput.desc,
        price: valueInput.price,
        distance: valueInput.distance,
        photos: valueInput.image,
        type: valueInput.type,
        rooms: roomsValue,
        featured: featureValue,
        title: valueInput.title,
      };
      await request.postAddHotel({...addHotel});
      navigate('/hotel');
    } catch (err) {
      console.log(err);
      setIsValid('Please, complete procedure before registration.')
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        <div className={styled.container}>
          <h3 className={styled.title}>Add New Hotel</h3>
          <div className={styled.content}>
            <div className={styled["add-info"]}>
              <div className={styled.left}>
                <div className={styled["form-group"]}>
                  <label>Name</label>
                  <input
                    type="text"
                    value={valueInput.name}
                    name="name"
                    placeholder="My hotel"
                    onChange={(e) => handleChangeInput(e, "name")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>City</label>
                  <input
                    type="text"
                    value={valueInput.city}
                    name="city"
                    placeholder="My hotel"
                    onChange={(e) => handleChangeInput(e, "city")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>Distance from City Center</label>
                  <input
                    type="text"
                    value={valueInput.distance}
                    name="distance"
                    placeholder="50m"
                    onChange={(e) => handleChangeInput(e, "distance")}
                  />
                </div>
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
                  <label>Image</label>
                  <input
                    type="text"
                    value={valueInput.image}
                    placeholder="https://pix8.agoda.net/hotelImages"
                    name="image"
                    onChange={(e) => handleChangeInput(e, "image")}
                  />
                </div>
              </div>

              <div className={styled.right}>
                <div className={styled["form-group"]}>
                  <label>Type</label>
                  <input
                    type="text"
                    value={valueInput.type}
                    name="type"
                    placeholder="resort"
                    onChange={(e) => handleChangeInput(e, "type")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>Address</label>
                  <input
                    type="text"
                    value={valueInput.address}
                    name="address"
                    placeholder="25 Edison, Texas"
                    onChange={(e) => handleChangeInput(e, "address")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>Title</label>
                  <input
                    type="text"
                    value={valueInput.title}
                    name="title"
                    placeholder="That's great!"
                    onChange={(e) => handleChangeInput(e, "title")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>Price</label>
                  <input
                    type="text"
                    value={valueInput.price}
                    name="price"
                    placeholder="100"
                    onChange={(e) => handleChangeInput(e, "price")}
                  />
                </div>
                <div className={styled["form-group"]}>
                  <label>Feature</label>
                  <select onChange={handleSelect}>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styled.room}>
              <div>Rooms</div>
              <div className={styled["select-room"]}>
                {rooms &&
                  rooms.map((room) => {
                    return (
                      <div key={room._id}>
                        <input
                          id={room._id}
                          type="checkbox"
                          onClick={(e) => handleSelectRoom(e, room._id)}
                        />
                        <label htmlFor={room._id}>{room.title}</label>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div style={{color: 'red', marginBottom: '5px', fontSize: '14px'}}>{isValid}</div>
            <button onClick={handleSave} className="btn btn-large btn-action">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelPage;
