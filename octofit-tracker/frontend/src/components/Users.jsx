import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeItems } from '../config/api';

function Users() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(buildApiUrl('/api/users'));
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setItems(normalizeItems(payload));
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load users.');
      } finally {
        setLoading(false);
      }
    };

    void fetchUsers();
  }, []);

  return (
    <section className="container py-4">
      <h2>Users</h2>
      {loading && <p>Loading users...</p>}
      {!loading && error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <ul className="list-group">
          {items.map((item) => (
            <li key={item._id ?? item.id ?? item.email} className="list-group-item">
              <strong>{item.name ?? 'Unknown user'}</strong>
              {item.email ? ` - ${item.email}` : ''}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default Users;
