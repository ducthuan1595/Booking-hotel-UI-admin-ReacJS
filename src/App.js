import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import { context } from './store/store';
import { useContext, useEffect } from 'react';

import HomePage from './page/HomePage';
import HotelPage from './page/HotelPage';
import AddHotelPage from './page/AddHotelPage';
import RoomPage from './page/RoomPage';
import AddRoomPage from './page/AddRoomPage';

function App() {
  const { admin } = useContext(context);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Form />} />
            <Route path='/dashboard' element={<HomePage />} />
            <Route path='/hotel' element={<HotelPage />} />
            <Route path='/hotel/form/:params' element={<AddHotelPage />} />
            <Route path='/room' element={<RoomPage />} />
            <Route path='/room/form/:params' element={<AddRoomPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
