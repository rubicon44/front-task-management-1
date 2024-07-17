import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Users
import { User } from "./pages/users/User";
import { UserCreate } from "./pages/users/UserCreate";
import { UserEdit } from "./pages/users/UserEdit";
import { Users } from "./pages/users/Users";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Users />} />
        
        <Route
          path="/users/:id"
          element={<User />}
        />
        <Route
          path="/users/create"
          element={<UserCreate />}
        />
        <Route
          path="/users/:id/edit"
          element={<UserEdit />}
        />
      </Routes>
    </Router>
  );
};

export default App;