import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { request } from "../service";

import styled from "./AddHotelPage.module.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const AddHotelPage = () => {
  const {params} = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [infoHotel, setInfoHotel] = useState(
    params !== "add-hotel" ? location.state.hotel : ""
  );
  const [rooms, setRooms] = useState();
  const [featureValue, setFeatureValue] = useState(1);
  const [roomsValue, setRoomsValue] = useState([]);
  const [isValid, setIsValid] = useState("");
  const [valueInput, setValueInput] = useState({
    name: params !== "add-hotel" ? infoHotel.name : "",
    city: params !== "add-hotel" ? infoHotel.city : "",
    address: params !== "add-hotel" ? infoHotel.address : "",
    image: params !== "add-hotel" ? infoHotel.photos : "",
    title: params !== "add-hotel" ? infoHotel.title : "",
    type: params !== "add-hotel" ? infoHotel.type : "",
    desc: params !== "add-hotel" ? infoHotel.desc : "",
    distance: params !== "add-hotel" ? infoHotel.distance : "",
    price: params !== "add-hotel" ? infoHotel.price : "",
  });

  useEffect(() => {
    const allRooms = async () => {
      const res = await request.getAllRoom();
      if (res.data.message === "ok") {
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
      if(roomsValue.length === 0) return setIsValid("Please, choose rooms before registration.");
      setIsValid("");
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
      if (params === "add-hotel") {
        await request.postAddHotel({ ...addHotel });
        return navigate("/hotel");
      }
      const hotelId = location.state.hotel._id;
      await request.postEditHotel({ ...addHotel, hotelId });
      navigate("/hotel");
    } catch (err) {
      console.log(err);
      setIsValid("Please, complete procedure before registration.");
    }
  };

  console.log("infor", infoHotel);
  return (
    <div>
      <Navbar />
      <div className={styled.dashboard}>
        <SideBar />
        <div className={styled.container}>
          <h3 className={styled.title}>
            {params === "add-hotel" ? "Add new hotel" : "Edit hotel"}
          </h3>
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
                    type="number"
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
                          value={roomsValue}
                          onClick={(e) => handleSelectRoom(e, room._id)}
                        />
                        <label htmlFor={room._id}>{room.title}</label>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div
              style={{ color: "red", marginBottom: "5px", fontSize: "14px" }}
            >
              {isValid}
            </div>
            <button onClick={handleSave} className="btn btn-large btn-action">
              {params === "add-hotel" ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHotelPage;
