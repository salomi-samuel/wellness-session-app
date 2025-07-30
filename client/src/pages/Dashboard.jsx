import { useEffect, useState } from "react";
import API from "../services/api";
import SessionCard from "../components/SessionCard";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get("/sessions"); // Public endpoint
        setSessions(res.data);
      } catch (err) {
        toast.error("Failed to fetch sessions");
      }
    };
    fetchSessions();
  }, []);

  return (
    <div>
      <h2>🌿 Public Wellness Sessions</h2>
      {sessions.length === 0 ? (
        <p>No sessions found.</p>
      ) : (
        sessions.map((session) => (
          <SessionCard key={session._id} session={session} />
        ))
      )}
    </div>
  );
}
