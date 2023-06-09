import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import styled from "./RoomPage.module.css";
import { request } from "../service";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RoomPage = () => {
  const [rooms, setRooms] = useState();
  const navigate = useNavigate();

  const getRooms = async () => {
    try {
      const res = await request.getAllRoom();
      if (res.data.message === "ok") {
        console.log("rooms", res.data);
        setRooms(res.data.rooms);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const handleAddRoom = () => {
    navigate("/room/form/add-room");
  };

  const handleEdit = async (id) => {
    try {
      const res = await request.getEditRoom(id);
      if (res.data.message === "ok") {
        console.log(res.data);
        navigate(`/room/form/${id}`, { state: { room: res.data.room } });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure!")) {
        const res = await request.deleteRoom(id);
        if (res.data.message !== "ok") {
          return alert(res.data.message);
        }
        getRooms();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styled["room-page"]}>
        <SideBar />
        <div className={styled.container}>
          <div className={styled.content}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <div className={styled.title}>Hotels List</div>
              <button onClick={handleAddRoom} className="btn btn-action">
                Add Room
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Max People</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {rooms ? (
                  rooms.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>{item._id}</td>
                        <td>{item.title}</td>
                        <td>{item.desc}</td>
                        <td>{item.price}</td>
                        <td style={{width: '100px'}}>{item.maxPeople}</td>
                        <td style={{width: '100px'}}>
                          <button
                            onClick={handleEdit.bind(null, item._id)}
                            className="btn btn-edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={handleDelete.bind(null, item._id)}
                            className="btn btn-destroy"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td>No transactions!</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className={styled.tableFoot}>1-{rooms ? rooms.length : 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
