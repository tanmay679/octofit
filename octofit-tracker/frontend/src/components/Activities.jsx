import { useEffect, useState } from 'react';
import { normalizeItems } from '../config/api';

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeItems(payload));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load activities.');
      } finally {
        setLoading(false);
      }
    };

    void fetchActivities();
  }, []);

  return (
    <section className="container py-4">
      <h2>Activities</h2>
      {loading && <p>Loading activities...</p>}
      {!loading && error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((item) => (
            <li key={item._id ?? item.id} className="list-group-item">
              <strong>{item.type ?? 'Activity'}</strong>
              {item.durationMinutes ? ` - ${item.durationMinutes} min` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Activities;
