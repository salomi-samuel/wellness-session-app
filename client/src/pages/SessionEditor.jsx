import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

export default function SessionEditor() {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [jsonUrl, setJsonUrl] = useState("");
  const { id } = useParams(); // Optional for editing existing
  const navigate = useNavigate();
  const [lastSaved, setLastSaved] = useState(null);

  // Auto-save every 30s OR after 5s of inactivity
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (title || tags || jsonUrl) handleSaveDraft();
    }, 30000);

    const timeout = setTimeout(() => {
      if (title || tags || jsonUrl) handleSaveDraft();
    }, 5000);

    return () => {
      clearInterval(saveInterval);
      clearTimeout(timeout);
    };
  });

  const handleSaveDraft = async () => {
    try {
      await API.post("/my-sessions/save-draft", {
        title,
        tags: tags.split(",").map((tag) => tag.trim()),
        json_file_url: jsonUrl,
      });
      setLastSaved(new Date().toLocaleTimeString());
      toast.success("Auto-saved as draft ✅");
    } catch (err) {
      toast.error("Auto-save failed ❌");
    }
  };

  const handlePublish = async () => {
    try {
      await API.post("/my-sessions/publish", {
        title,
        tags: tags.split(",").map((tag) => tag.trim()),
        json_file_url: jsonUrl,
      });
      toast.success("Session published 🚀");
      navigate("/my-sessions");
    } catch (err) {
      toast.error("Failed to publish session ❌");
    }
  };

  return (
    <div>
      <h2>📝 Create or Edit Wellness Session</h2>
      <input
        type="text"
        placeholder="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      /><br /><br />
      <input
        type="text"
        placeholder="JSON File URL"
        value={jsonUrl}
        onChange={(e) => setJsonUrl(e.target.value)}
      /><br /><br />
      <button onClick={handleSaveDraft}>💾 Save Draft</button>
      <button onClick={handlePublish}>🚀 Publish</button>

      {lastSaved && <p style={{ color: "green" }}>Last auto-saved at: {lastSaved}</p>}
    </div>
  );
}
