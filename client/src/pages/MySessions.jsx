import { useEffect, useState } from "react";
import API from "../services/api";
import SessionCard from "../components/SessionCard";
import { toast } from "react-toastify";

export default function MySessions() {
  const [sessions, setSessions] = useState([]);

 useEffect(() => {
  const fetchMySessions = async () => {
    try {
      const res = await API.get("/my-sessions");
      setSessions(res.data);
    } catch (err) {
      console.error("❌ Error fetching sessions:", err.response?.data || err.message);
      toast.error("Failed to fetch your sessions");
    }
  };
  fetchMySessions();
}, []);


  return (
    <div>
      <h2>📘 My Sessions</h2>
      {sessions.length === 0 ? (
        <p>You haven't created any sessions yet.</p>
      ) : (
        sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))
      )}
    </div>
  );
}
