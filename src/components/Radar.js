import React, { useState, useEffect } from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import { supabase } from '../supabaseClient'; // Adjust based on your Supabase client setup

const Radar = () => {
  const [chartData, setChartData] = useState([]);
  const [captions, setCaptions] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      // Get the logged-in user's ID
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }
      const userId = userData?.user?.id;
      console.log('User ID:', userId); // Check user ID

      // Fetch penilaian_domain data for the logged-in user
      const { data, error } = await supabase
        .schema('simbatik') // Ensure this schema is correct
        .from('penilaian_domain')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching chart data:', error);
        return;
      }

      console.log('Fetched Data:', data); // Check fetched data

      if (!data || data.length === 0) {
        console.error('No data found for the user');
        return;
      }

      const radarData = [
        {
          data: data.reduce((acc, item) => {
            // Scale score to be between 0 and 2
            acc[item.domain_nama] = Math.min(item.total_domain_skor * 100 / (item.domain_bobot * 5), 2);
            return acc;
          }, {}),
          meta: { color: 'blue' },
        },
      ];

      // Set captions using domain_nama
      const chartCaptions = data.reduce((acc, item) => {
        acc[item.domain_nama] = item.domain_nama;
        return acc;
      }, {});

      setChartData(radarData);
      setCaptions(chartCaptions);
    };

    fetchChartData();
  }, []);

  return (
    <div>
      {/* Adjust chart size to 300 for smaller display */}
      <RadarChart captions={captions} data={chartData} size={300} />
    </div>
  );
};

export default Radar;
