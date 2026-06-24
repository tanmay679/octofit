import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeItems } from '../config/api';

function Activities() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/activities'));
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
