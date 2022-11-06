import {Route,Routes,BrowserRouter} from "react-router-dom";
import Login from "./Components/Login/login"
import Register from "./Components/Register/register";
import Body from "./Components/Todo/body";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path='/body' element={<Body/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
