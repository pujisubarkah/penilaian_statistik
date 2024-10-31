import React from 'react';

import { useNavigate } from 'react-router-dom';

function Penilaian() {
  const navigate = useNavigate();

  const goToQuestionnaire = () => {
    navigate('/questionnaire'); // Navigates to the Questionnaire page
  };

  return (
    <>
      {/* Header Section */}
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

      {/* Main Container */}
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">PENILAIAN MANDIRI</h1>
        <p className="text-left text-md text-gray-700">Penilaian Mandiri Lembaga Administrasi Negara</p>

        {/* Notification Banner */}
        <div className="bg-teal-700 p-4 rounded-md text-white mt-4">
          NAMA UNIT KERJA PRODUSEN DATA LAN
        </div>

        {/* Two-Column Layout for Activities and Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Activities Column */}
          <div className="bg-white shadow-md p-4 md:col-span-2">
            <div className="space-y-4">
              {/* Replace with activity details from database */}
              <div>
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
          </div>

          {/* Progress Overview Column */}
          <div className="bg-teal-700 text-white p-4 rounded-md shadow-md md:col-span-1">
            <div className="text-4xl font-semibold">--</div>
            <div>Indikator sudah dilengkapi</div>

            {/* Progress Bar */}
            <div className="my-2 w-full bg-gray-300 h-2 rounded">
              <div className="bg-white h-full rounded" style={{ width: '75%' }}> </div>
            </div>
            <div className="text-sm">--% Completed</div>
          </div>
        </div>

       {/* Notification Banner for IPS */}
      <div className="bg-gray-300 p-4 rounded-md text-black font-bold mt-4 flex justify-between items-center">
        <span>Nilai Indeks Pembangunan Statistik (IPS) Unit Kerja</span>
        <button onClick={goToQuestionnaire}  className="bg-teal-700 text-white px-10 py-2 rounded-md hover:bg-teal-500">
          Lihat Isian
        </button>
      </div>

        {/* Two-Column Layout for Activities and Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {/* Activities Column with Table Placeholder */}
          <div className="bg-white shadow-md p-4 md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Kegiatan Statistik</h2>
            <div className="col-span-2">
              <table className="min-w-full bg-white">
                  <thead>
                      <tr>
                          <th className="py-2 px-4 border-b">Domain</th>
                          <th className="py-2 px-4 border-b">Nilai Mandiri</th>
                          <th className="py-2 px-4 border-b">Nilai Walidata</th>
                          <th className="py-2 px-4 border-b">Bobot</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td className="py-2 px-4 border-b">1. Prinsip Satu Data Indonesia</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">50%</td>
                      </tr>
                      <tr>
                          <td className="py-2 px-4 border-b">2. Kualitas Data</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">30%</td>
                      </tr>
                      <tr>
                          <td className="py-2 px-4 border-b">3. Proses Bisnis Statistik</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">15%</td>
                      </tr>
                      <tr>
                          <td className="py-2 px-4 border-b">4. Kelembagaan dan Statistik Nasional</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">-.-- / 5.00</td>
                          <td className="py-2 px-4 border-b">5%</td>
                      </tr>
                  </tbody>
              </table>
          </div>
            
          </div>

          {/* Progress Overview Column with Radar Chart Placeholder */}
          <div className="bg-white shadow-md p-4 md:col-span-1">
            <h2 className="text-lg font-semibold mb-4">Overview Indikator</h2>
            <div className="h-64 flex items-center justify-center bg-gray-200 rounded-md">
              <span className="text-teal-700">[Radar Chart Placeholder]</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Penilaian;
