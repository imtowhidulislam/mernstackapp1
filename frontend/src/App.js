import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  Form,
  Homepage,
  Navbar,
  Userform,
} from "./components/componentsExporter";
import { AuthContextProvider } from "./context/AuthContext";
import GlobalUser from "./components/globalUser";

function App() {
  const { user } = GlobalUser();
  return (
    <div className="bg-[#f1f0ef] h-screen ">
      <AuthContextProvider>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={user ? <Homepage /> : <Navigate to="userform" />}
          />
          <Route path="form" element={<Form />} />
          <Route
            path="userform"
            element={!user ? <Userform /> : <Navigate to="/" />}
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
