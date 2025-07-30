import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f4f4f4" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Dashboard</Link>
      {token && (
        <>
          <Link to="/my-sessions" style={{ marginRight: "10px" }}>My Sessions</Link>
          <Link to="/editor" style={{ marginRight: "10px" }}>New Session</Link>
        </>
      )}
      {!token ? (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>
      )}
    </nav>
  );
}
