import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

function Penilaian() {
  const navigate = useNavigate();
  const [indikators, setIndikators] = useState({});
  const [activeDomain, setActiveDomain] = useState(null);
  const [totalIndicators, setTotalIndicators] = useState(0);
  const [completedIndicators, setCompletedIndicators] = useState(0);
  const [ipsValue, setIpsValue] = useState(null); // State for IPS value

  useEffect(() => {
    const fetchIndikators = async () => {
      const { data, error } = await supabase
        .schema('simbatik')
        .from('indikator')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        const groupedIndikators = data.reduce((acc, curr) => {
          const domain = curr.domain_nama;
          if (!acc[domain]) {
            acc[domain] = {
              id: curr.domain_id,
              name: domain,
              domain_bobot: curr.domain_bobot, // Ensure this field is in the data
              indicators: [],
            };
          }
          acc[domain].indicators.push({
            id: curr.indikator_id,
            name: curr.indikator_nama,
            completed: curr.completed, // Assuming there's a completed field
            indicator_bobot: curr.indicator_bobot, // Ensure this field is in the data
          });
          return acc;
        }, {});

        setIndikators(groupedIndikators);
        setTotalIndicators(data.length);
        setCompletedIndicators(data.filter(ind => ind.completed).length);
      }
    };

    const fetchIpsValue = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
    
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }
    
      const userId = user ? user.id : null; // Get the current user's ID if logged in
    
      if (userId) {
        const { data, error } = await supabase
          .schema('simbatik')
          .from('unit_kerja')
          .select('unit_kerja') // Fetch the specific field
          .eq('user_id', userId)
          .single();
    
        if (error) {
          console.error('Error fetching unit kerja:', error);
        } else {
          setIpsValue(data?.unit_kerja); // Store the value of unit_kerja
        }
      } else {
        console.warn('No user is logged in');
      }
    };

    fetchIndikators();
    fetchIpsValue();
  }, []);

  const goToQuestionnaire = () => {
    navigate('/questionnaire');
  };

  const handleDomainClick = (domain) => {
    setActiveDomain(activeDomain === domain ? null : domain);
  };
  return (
    <>
      <div
        className="relative bg-cover bg-center text-white p-6 mb-6"
        style={{ backgroundImage: 'url(https://lan.go.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-24-at-13.43.42-1024x682.jpeg)' }}
      >
        <div className="absolute inset-0 bg-teal-700 opacity-75"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL</h1>
          <p className="text-2xl mt-2">
            Pembinaan Statistik Sektoral dan Mini EPSS Internal Lembaga Administrasi Negara
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">PENILAIAN MANDIRI</h1>
        <p className="text-left text-md text-gray-700">Penilaian Mandiri Lembaga Administrasi Negara</p>

        <div className={`p-4 rounded-md text-white mt-4 ${completedIndicators === totalIndicators ? 'bg-teal-600' : 'bg-teal-600'}`}>
          {completedIndicators === totalIndicators ? 'Pengisian sudah selesai' : 'Pengisian belum selesai'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white shadow-md p-4 md:col-span-2">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-4">Kegiatan Statistik yang dilakukan</h2>
              <div className="mt-2">
                <div className="border-b py-2">
                  <h3 className="font-medium">Kegiatan --</h3>
                  <p>Nama Kegiatan Statistik</p>
                  <p className="text-gray-500">Tahun | Unit Kerja | Tim Kerja/Poksi</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-700 text-white p-4 rounded-md shadow-md md:col-span-1">
            <div className="text-4xl font-semibold">{completedIndicators}/{totalIndicators}</div>
            <div>Indikator sudah dilengkapi</div>
            <div className="my-2 w-full bg-gray-300 h-2 rounded">
              <div
                className="bg-white h-full rounded"
                style={{ width: `${(completedIndicators / totalIndicators) * 100}%` }}
              />
            </div>
            <div className="text-sm">{Math.round((completedIndicators / totalIndicators) * 100)}% Completed</div>
          </div>
        </div>

        {/* IPS Section */}
        <div className="bg-gray-300 p-4 rounded-md text-black font-bold mt-4 flex justify-between items-center">
          <span>Nilai Indeks Pembangunan Statistik (IPS) Unit Kerja: {ipsValue !== null ? ipsValue : 'Loading...'}</span>
          <button onClick={goToQuestionnaire} className="bg-teal-700 text-white px-10 py-2 rounded-md hover:bg-teal-500">
            Lihat Isian
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white shadow-md p-4 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Kegiatan Statistik</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Domain</th>
                  <th className="py-2 px-4 border-b">Bobot</th>
                  <th className="py-2 px-4 border-b">Nilai Produsen Data</th>
                  <th className="py-2 px-4 border-b">Nilai Wali Data</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(indikators)
                  .sort((a, b) => indikators[a].id - indikators[b].id)
                  .map((domain, index) => (
                    <React.Fragment key={index}>
                      <tr onClick={() => handleDomainClick(domain)} className="cursor-pointer hover:bg-gray-100">
                        <td className="py-2 px-4 border-b">{`${indikators[domain].id}. ${indikators[domain].name}`}</td>
                        <td className="py-2 px-4 border-b">{indikators[domain].domain_bobot}</td>
                        <td className="py-2 px-4 border-b"></td>
                        <td className="py-2 px-4 border-b"></td>
                      </tr>
                      {activeDomain === domain && (
                        <tr>
                          <td colSpan={4}>
                            <ul>
                              {indikators[domain].indicators
                                .sort((a, b) => a.id - b.id)
                                .map((ind, indIndex) => (
                                  <li key={indIndex} className="py-2 px-4 border-b flex justify-between">
                                    <span>{`${ind.id}. ${ind.name}`}</span>
                                    <span>{ind.indicator_bobot}</span> {/* Adjust field name as necessary */}
                                  </li>
                                ))}
                            </ul>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white shadow-md p-4 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Overview Indikator</h2>
            <div className="h-64 flex items-center justify-center bg-gray-200 rounded-md">
              <span className="text-center">Chart/Graph Here</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Penilaian;
