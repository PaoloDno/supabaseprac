import supabase from "../config/supaBaseClient";
import { useEffect, useState } from 'react';
//component
import SmoothieCard from "../components/SmoothieCard";

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
      {fetchError && (<p>{fetchError}</p>)}
      {smoothies && (
        <div className="smoothies">
          {/* order-by buttons */}
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard key={smoothie.id} smoothie={smoothie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
