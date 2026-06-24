import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeItems } from '../config/api';

function Workouts() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/workouts'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeItems(payload));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    };

    void fetchWorkouts();
  }, []);

  return (
    <section className="container py-4">
      <h2>Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {!loading && error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? item.title} className="list-group-item">
              <strong>{item.title ?? 'Workout'}</strong>
              {item.focusArea ? ` - ${item.focusArea}` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Workouts;
