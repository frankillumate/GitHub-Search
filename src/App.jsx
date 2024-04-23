import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./Home.jsx";
import ErrorDisplay from "./Components/Error.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route index path="/home" element={<Home/>}/>
    <Route path="*" element={<ErrorDisplay/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
