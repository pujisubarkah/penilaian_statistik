import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Radar from '../components/Radar';
import KegiatanStatistik from '../components/KegiatanStatistik';
import Footer from '../components/Footer';

function Penilaian() {
  const navigate = useNavigate();
  const [indikators, setIndikators] = useState({});
  const [activeDomain, setActiveDomain] = useState(null);
  const [totalIndicators, setTotalIndicators] = useState(0);
  const [completedIndicators, setCompletedIndicators] = useState(0);
  const [ipsValue, setIpsValue] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [namaKegiatan, setNamaKegiatan] = useState("");
  const [tahunKegiatan, setTahunKegiatan] = useState("");
  const [subunitKerja, setsubunitKerja] = useState("");
  const [jenisKegiatan, setJenisKegiatan] = useState("");
  const [kegiatanList, setKegiatanList] = useState([]);
  const [unitKerja, setUnitKerja] = useState('');

  // Fetch saved activities from the database
  useEffect(() => {
    const fetchKegiatan = async () => {
      const { data, error } = await supabase
        .schema("simbatik")
        .from("kegiatan")
        .select("*");

      if (error) {
        console.error("Error fetching kegiatan:", error);
      } else {
        setKegiatanList(data);
      }
    };

    fetchKegiatan();
  }, []);

  const handleAddKegiatan = async (e) => {
    e.preventDefault();
    const userId = (await supabase.auth.getUser()).data.user.id;

    const { error } = await supabase
      .schema("simbatik")
      .from("kegiatan")
      .insert([
        {
          user_id: userId,
          kegiatan_statistik: namaKegiatan,
          sub_unitkerja: subunitKerja,
          tahun: tahunKegiatan,
          jenis_kegiatan: jenisKegiatan,
        },
      ]);

    if (error) {
      console.error("Error adding kegiatan:", error);
    } else {
      // Refresh the list of kegiatan after adding a new one
      setKegiatanList([
        ...kegiatanList,
        { kegiatan_statistik: namaKegiatan, 
          sub_unitkerja: subunitKerja,
          tahun: tahunKegiatan,
          jenis_kegiatan: jenisKegiatan },
      ]);
    }
  };
  
    // Fetch unit kerja for logged-in user
    useEffect(() => {
      const fetchUnitKerja = async () => {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) return console.error(userError || 'User not found');
        const { data, error } = await supabase
          .schema('simbatik')
          .from('unit_kerja')
          .select('unit_kerja')
          .eq('user_id', user.id)
          .single();
        if (error) console.error('Error fetching unit kerja:', error);
        else setUnitKerja(data?.unit_kerja || '');
      };
      fetchUnitKerja();
    }, []);

  useEffect(() => {
    const fetchIndicatorsData = async () => {
      // Fetch total indicators from master_indikator
      const { data: totalData, error: totalError } = await supabase
       .schema('simbatik')
        .from('master_indikator')
        .select('*');

      if (totalError) {
        console.error('Error fetching total indicators:', totalError);
        return;
      }
      setTotalIndicators(totalData.length); // Set total indicators

      // Fetch completed indicators from penilaian_indikator for the logged-in user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }

      const userId = userData?.user?.id; // Ensure userId is correctly obtained
      const { data: completedData, error: completedError } = await supabase
          .schema('simbatik')
          .from('penilaian_indikator')
          .select('indikator_id')
          .eq('user_id', userId);
      

      if (completedError) {
        console.error('Error fetching completed indicators:', completedError);
        return;
      }
      setCompletedIndicators(completedData.length); // Set completed indicators

      // Fetch and group the indicators
      const { data: indicatorData, error: indicatorError } = await supabase
        .schema('simbatik')
        .from('indikator')
        .select('*');

      if (indicatorError) {
        console.error('Error fetching indicators:', indicatorError);
      } else {
        const groupedIndikators = indicatorData.reduce((acc, curr) => {
          const domain = curr.domain_nama;
          if (!acc[domain]) {
            acc[domain] = {
              id: curr.domain_id,
              name: domain,
              domain_bobot: curr.domain_bobot,
              indicators: [],
            };
          }
          acc[domain].indicators.push({
            id: curr.indikator_id,
            name: curr.indikator_nama,
            completed: curr.completed,
            indicator_bobot: curr.indicator_bobot,
          });
          return acc;
        }, {});

        setIndikators(groupedIndikators);
      }
    };

    fetchIndicatorsData();
  }, []);

  const goToQuestionnaire = () => {
    navigate('/questionnaire');
  };

  const handleDeleteKegiatan = async (id) => {
    const { error } = await supabase
      .schema("simbatik")
      .from("kegiatan")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting kegiatan:", error);
    } else {
      setKegiatanList(kegiatanList.filter((kegiatan) => kegiatan.id !== id));
    }
  };

  const handleEditKegiatan = (kegiatan) => {
    setNamaKegiatan(kegiatan.kegiatan_statistik);
    setTahunKegiatan(kegiatan.tahun);
    setsubunitKerja(kegiatan.sub_unitkerja);
    setJenisKegiatan(kegiatan.jenis_kegiatan);
    setShowForm(true);
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
              {kegiatanList.map((kegiatan, index) => (
              <div key={index} className="border-b py-2 flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center">
                    {kegiatan.kegiatan_statistik}
                    <button
                      onClick={() => handleEditKegiatan(kegiatan)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-400 ml-2 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteKegiatan(kegiatan.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-400 ml-2 text-sm"
                    >
                      Delete
                    </button>
                  </h3>
                  <p>{kegiatan.jenis_kegiatan}</p>
                  <p className="text-gray-500">
                    {kegiatan.tahun} | {unitKerja} | {kegiatan.sub_unitkerja}
                  </p>
                </div>
              </div>
            ))}


            <button
              onClick={() => setShowForm(true)}
              className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-500 mt-4"
            >
              Tambah Kegiatan Statistik
            </button>

            {/* Popup modal for the form */}
            {showForm && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h2 className="text-lg font-semibold mb-4">Tambah Kegiatan Statistik</h2>
                  <form onSubmit={handleAddKegiatan}>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="namaKegiatan"
                      >
                        Nama Kegiatan
                      </label>
                      <input
                        type="text"
                        id="namaKegiatan"
                        value={namaKegiatan}
                        onChange={(e) => setNamaKegiatan(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="tahunKegiatan"
                      >
                        Tahun Kegiatan
                      </label>
                      <input
                        type="text"
                        id="tahunKegiatan"
                        value={tahunKegiatan}
                        onChange={(e) => setTahunKegiatan(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="subunitKerja"
                      >
                        Tim Kerja/Poksi
                      </label>
                      <input
                        type="text"
                        id="subunitKerja"
                        value={subunitKerja}
                        onChange={(e) => setsubunitKerja(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="jenisKegiatan"
                      >
                        Jenis Kegiatan
                      </label>
                      <select
                        id="jenisKegiatan"
                        value={jenisKegiatan}
                        onChange={(e) => setJenisKegiatan(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                      >
                        <option value="">Pilih Jenis Kegiatan</option>
                        <option value="Kompilasi Data">Kompilasi Data</option>
                        <option value="Survei">Survei</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="submit"
                        className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-500"
                      >
                        Tambah
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
            </div>
          </div>

          <div className="bg-teal-700 text-white p-4 rounded-md shadow-md md:col-span-1">
        <div className="text-4xl font-semibold">{completedIndicators}/{totalIndicators}</div>
        <div>Indikator sudah dilengkapi</div>
        <div className="my-2 w-full bg-gray-300 h-2 rounded">
          <div
            className="bg-white h-full rounded"
            style={{ width: totalIndicators > 0 ? `${(completedIndicators / totalIndicators) * 100}%` : '0%' }}
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

          <div className="flex flex-col md:flex-row gap-4 mt-4">
  <div className="flex-grow"> {/* This will take the remaining width */}
    <KegiatanStatistik />
  </div>
  <div className="w-1/3"> {/* Set a fixed width for Radar */}
    <Radar />
  </div>
</div>
</div>


      <Footer />
    </>
  );
}

export default Penilaian;
