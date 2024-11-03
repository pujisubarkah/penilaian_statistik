import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

function KegiatanStatistik() {
  const [indikators, setIndikators] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [activeDomain, setActiveDomain] = useState(null);
  const [view, setView] = useState('domain');

  useEffect(() => {
    const fetchData = async () => {
      // Ambil data pengguna yang sedang login
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error getting user:", userError);
        return;
      }

      if (!user) {
        console.error("User tidak ditemukan.");
        return;
      }

      const userId = user.id;

      // Fetch indikator data yang sesuai dengan user_id
      const { data: indikatorData, error: indikatorError } = await supabase
        .schema('simbatik')
        .from('penilaian_indikator')
        .select('*')
        .eq('user_id', userId);  // Filter berdasarkan user_id

      if (indikatorError) {
        console.error("Error fetching indikator data:", indikatorError);
        return;
      }

      console.log("Fetched indikator data:", indikatorData);

      // Fetch domain data yang sesuai dengan user_id
      const { data: domainData, error: domainError } = await supabase
        .schema('simbatik')
        .from('penilaian_domain')
        .select('*')
        .eq('user_id', userId);  // Filter berdasarkan user_id

      if (domainError) {
        console.error("Error fetching domain data:", domainError);
        return;
      }

      console.log("Fetched domain data:", domainData);

      // Process and calculate
      const processedIndikators = {};
      let total = 0;

      if (domainData) {
        domainData.forEach((domain) => {
          const domainId = domain.domain_id;
          const domainIndicators = indikatorData.filter((ind) => ind.domain_id === domainId);
          const domainScore = domain.total_domain_skor || 0;

          // Sum the indicator scores for each domain
          const indicatorSum = domainIndicators.reduce(
            (sum, ind) => sum + (ind.indikator_finalskor || 0),
            0
          );

          processedIndikators[domainId] = {
            ...domain,
            indicators: domainIndicators,
            indicatorSum,
          };
          total += domainScore;
        });
      }

      setIndikators(processedIndikators);
      setTotalScore(total);
      console.log("Processed indikators:", processedIndikators);
      console.log("Total Score:", total);
    };

    fetchData();
  }, []);

  const handleDomainClick = (domain) => {
    setActiveDomain(activeDomain === domain ? null : domain);
    setView(activeDomain === domain ? 'domain' : 'indikator');
  };

  return (
    <div className="bg-white shadow-md p-4 md:col-span-2">
      <h2 className="text-lg font-semibold mb-4">Kegiatan Statistik</h2>
      <div className="mb-4 p-2 bg-gray-100 rounded-md">
        <strong>Total Skor: </strong>{totalScore}
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Domain / Indikator</th>
            <th className="py-2 px-4 border-b">Bobot</th>
            <th className="py-2 px-4 border-b">Nilai Produsen Data</th>
            <th className="py-2 px-4 border-b">Nilai Wali Data</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(indikators)
            .sort((a, b) => parseInt(a) - parseInt(b))
            .map((domain, index) => (
              <React.Fragment key={index}>
                <tr onClick={() => handleDomainClick(domain)} className="cursor-pointer hover:bg-gray-100 font-bold">
                  <td className="py-2 px-4 border-b">
                    {`${indikators[domain].domain_id}. ${indikators[domain].domain_nama}`}
                  </td>
                  <td className="py-2 px-4 border-b">{indikators[domain].domain_bobot}</td>
                  <td className="py-2 px-4 border-b">{indikators[domain].indicatorSum}</td>
                  <td className="py-2 px-4 border-b"></td>
                </tr>
                {activeDomain === domain && indikators[domain].indicators
                  .sort((a, b) => a.indikator_id - b.indikator_id)
                  .map((ind, indIndex) => (
                    <tr key={indIndex} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border-b pl-6">
                        {`${ind.indikator_id}. ${ind.indikator_nama || ind.name}`}
                      </td>
                      <td className="py-2 px-4 border-b">{ind.indikator_bobot}</td>
                      <td className="py-2 px-4 border-b">{ind.indikator_finalskor || 0}</td>
                      <td className="py-2 px-4 border-b"></td>
                    </tr>
                  ))}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default KegiatanStatistik;
