import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeItems } from '../config/api';

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(buildApiUrl('leaderboard'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeItems(payload));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    };

    void fetchLeaderboard();
  }, []);

  return (
    <section className="container py-4">
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard...</p>}
      {!loading && error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ol className="list-group list-group-numbered">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? item.rank} className="list-group-item">
              <strong>{item.user?.name ?? item.name ?? 'Athlete'}</strong>
              {typeof item.points === 'number' ? ` - ${item.points} pts` : ''}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default Leaderboard;
