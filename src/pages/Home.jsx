import supabase from "../config/supaBaseClient";
import { useEffect, useState } from 'react';

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState([]);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from('smoothies')
        .select('*');

      if (error) {
        console.error('Fetch error:', error.message);
        setFetchError('Could not fetch the smoothies');
        setSmoothies([]);
      } else {
        console.log('Fetched successfully:', data);
        setSmoothies(data);
        setFetchError(null);
      }
    };

    fetchSmoothies();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p className="error">{fetchError}</p>}
      {smoothies.length > 0 && (
        <div className="smoothie-list">
          {smoothies.map((smoothie) => (
            <p key={smoothie.id}>{smoothie.title}</p> // ✅ Add a key
          ))}
        </div>
      )}
      {smoothies.length === 0 && !fetchError && <p>Loading or no smoothies found.</p>}
    </div>
  );
};

export default Home;
