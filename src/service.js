import axios from 'axios';

const url = process.env.REACT_APP_API_URL;
class Request {
  signIn(email, password) {
    return axios.post(`${url}/admin/sign-in`, {email, password});
  };
  getAllTransaction(quantity) {
    return axios.get(`${url}/admin/get-all-transaction?quantity=${quantity}`);
  };
  getAllHotel() {
    return axios.get(`${url}/get-all-hotel`);
  };
  postAddHotel({...addHotel}) {
    return axios.post(`${url}/admin/add-hotel`, {...addHotel})
  };
  getEditHotel(hotelId) {
    return axios.get(`${url}/admin/get-edit-hotel/${hotelId}`)
  };
  postEditHotel({ ...editHotel }) {
    return axios.post(`${url}/admin/edit-hotel`, {...editHotel})
  };
  deleteHotel(hotelId) {
    return axios.post(`${url}/admin/delete-hotel`, {hotelId});
  };
  getAllRoom() {
    return axios.get(`${url}/admin/get-all-room`);
  };
  postAddRoom({...addRoom}) {
    return axios.post(`${url}/admin/add-room`, {...addRoom});
  };
  getEditRoom(roomId) {
    return axios.get(`${url}/admin/get-edit-room/${roomId}`);
  }
  postEditRoom({...editRoom}) {
    return axios.post(`${url}/admin/edit-room`, {...editRoom});
  };
  deleteRoom(roomId) {
    return axios.post(`${url}/admin/delete-room`, {roomId});
  }
}

export const request = new Request();

