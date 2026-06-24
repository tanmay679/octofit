import { useEffect, useState } from 'react';
import { normalizeItems } from '../config/api';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

function Teams() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeItems(payload));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load teams.');
      } finally {
        setLoading(false);
      }
    };

    void fetchTeams();
  }, []);

  return (
    <section className="container py-4">
      <h2>Teams</h2>
      {loading && <p>Loading teams...</p>}
      {!loading && error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? item.name} className="list-group-item">
              <strong>{item.name ?? 'Unnamed team'}</strong>
              {item.description ? ` - ${item.description}` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Teams;
