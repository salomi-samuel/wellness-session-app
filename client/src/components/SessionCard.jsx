export default function SessionCard({ session }) {
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px 0" }}>
      <h3>{session.title}</h3>
      <p><strong>Tags:</strong> {session.tags.join(", ")}</p>
      <p><strong>JSON File:</strong> <a href={session.json_file_url} target="_blank" rel="noreferrer">View</a></p>
      <p>Status: {session.status}</p>
    </div>
  );
}
