import './App.scss';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Notes from './routes/Notes/Notes';
import AddNote from './routes/AddNote/AddNote';

function App() {
  

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Notes />} />
            <Route path="/add" element={<AddNote />} />
            <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    </BrowserRouter>
);
}

export default App;
