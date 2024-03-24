import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function App() {
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={userData?<Home></Home>:<Navigate to="/login" />}></Route>
        <Route
          path="/signUp"
          element={userData ? <Navigate to="/" /> : <SignUp></SignUp>}
        ></Route>

        <Route
          path="/login"
          element={userData ? <Navigate to="/" /> : <Login></Login>}
        ></Route>
      </Routes>
      <div>
        <Toaster />
      </div>
    </div>
  );
}

export default App;
