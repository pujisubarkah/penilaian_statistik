import React, { useState, useEffect } from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import { supabase } from '../supabaseClient'; // Sesuaikan dengan konfigurasi Supabase Anda

const Radar = () => {
  const [chartData, setChartData] = useState([]);
  const [captions, setCaptions] = useState({});
  const [scores, setScores] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }
      const userId = userData?.user?.id;
      console.log('User ID:', userId);

      const { data, error } = await supabase
        .schema('simbatik') // Pastikan schema benar
        .from('penilaian_domain')
        .select('*')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching chart data:', error);
        return;
      }

      if (!data || data.length === 0) {
        console.error('No data found for the user');
        return;
      }

      // Menyiapkan data dan skor untuk radar chart
      const radarData = [
        {
          data: data.reduce((acc, item) => {
            acc[item.domain_nama] = Math.min(item.total_domain_skor * 100 / (item.domain_bobot * 5), 2);
            return acc;
          }, {}),
          meta: { color: 'blue' },
        },
      ];

      const chartCaptions = data.reduce((acc, item) => {
        acc[item.domain_nama] = item.domain_nama;
        return acc;
      }, {});

      // Menyimpan nilai asli untuk ditampilkan sebagai label
      const dataScores = data.reduce((acc, item) => {
        acc[item.domain_nama] = item.total_domain_skor;
        return acc;
      }, {});

      setChartData(radarData);
      setCaptions(chartCaptions);
      setScores(dataScores);
    };

    fetchChartData();
  }, []);

  return (
    <div className="relative w-[300px] h-[300px] mx-auto ml-20">
      {/* Chart Radar */}
      <RadarChart captions={captions} data={chartData} size={300} />

     {/* Menampilkan nilai setiap titik di sekitar radar chart */}
<div className="absolute inset-0 flex items-center justify-center">
  {Object.keys(scores).map((domain, index) => (
    <div
      key={index}
      className="absolute text-base font-semibold text-white bg-black bg-opacity-70 rounded px-2 py-1 z-10" // Mengubah text-sm menjadi text-base dan menambahkan z-10
      style={{
        top: `${50 - Math.cos((index * 2 * Math.PI) / Object.keys(scores).length) * 30}%`, // Menaikkan posisi label
        left: `${50 + Math.sin((index * 2 * Math.PI) / Object.keys(scores).length) * 30}%`, // Menaikkan posisi label
        transform: 'translate(-50%, -50%)', // Memusatkan label
      }}
    >
      {scores[domain]}
    </div>
  ))}
</div>
    </div>
  );
};

export default Radar;
