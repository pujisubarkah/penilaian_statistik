import React from 'react';

function EPSS() {
  return (
    <div>
      <div className="relative bg-cover bg-center text-white p-6 mb-6" style={{ backgroundImage: 'url(https://lan.go.id/wp-content/uploads/2022/06/WhatsApp-Image-2022-06-24-at-13.43.42-1024x682.jpeg)' }}>
        <div className="absolute inset-0 bg-teal-700 opacity-75"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold">EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL</h1>
          <p className="text-2xl mt-2">Pembinaan Statistik Sektoral dan Mini EPSS Internal Lembaga Administrasi Negara</p>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">INDEKS PEMBANGUNAN STATISTIK LANRI</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="border p-4 rounded-lg text-center">
            <iframe src="https://drive.google.com/file/d/16Tf1IhyLZWk2GiXx89eFQC17_-nzvyyk/preview" width="100%" height="480" allow="autoplay"></iframe>
            <p className="mt-4 text-center">IPS LANRI 2023: 2.22, Kategori: <span className="font-semibold">CUKUP</span></p>
            <a href="https://drive.google.com/uc?export=download&id=16Tf1IhyLZWk2GiXx89eFQC17_-nzvyyk" className="mt-2 inline-block bg-teal-700 text-white text-center py-2 px-4 rounded hover:bg-teal-800">Unduh EPSS LAN 2023</a>
          </div>
          <div className="border p-4 rounded-lg text-center">
            <iframe src="https://drive.google.com/file/d/1g3MbdEEPtLP7pUeX9SCuNLv8GGXv8Bb1/preview" width="100%" height="480" allow="autoplay"></iframe>
            <p className="mt-4 text-center">IPS LANRI 2024: 3.35, Kategori: <span className="font-semibold">BAIK</span></p>
            <a href="https://drive.google.com/uc?export=download&id=1g3MbdEEPtLP7pUeX9SCuNLv8GGXv8Bb1" className="mt-2 inline-block bg-teal-700 text-white text-center py-2 px-4 rounded hover:bg-teal-800">Unduh EPSS LAN 2024</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EPSS;
