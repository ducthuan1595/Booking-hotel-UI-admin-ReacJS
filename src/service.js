import axios from 'axios';

const url = 'http://localhost:5000';
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
  postAddHotel({ ...addHotel }) {
    return axios.post(`${url}admin/add-hotel`, {...addHotel})
  };
  postEditHotel({ ...editHotel }) {
    return axios.post(`${url}/admin/edit-hotel`, {...editHotel})
  }
  deleteHotel(hotelId) {
    return axios.post(`${url}/admin/delete-hotel`, {hotelId});
  };
  getAllRoom() {
    return axios.get(`${url}/admin/get-all-room`);
  }
}

export const request = new Request();

