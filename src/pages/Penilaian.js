import React from 'react';

function Penilaian() {
  return (
    <div className="p-6 bg-gray-100">
      {/* Header */}
      <>
        <p className="p-0 m-0 mt-4" style={{ textAlign: 'left', fontSize: '13pt', fontWeight: 500, color: 'rgb(31, 34, 37)' }}>
          PENILAIAN MANDIRI
        </p>
        <p className="p-0 mb-2" style={{ textAlign: 'left', fontSize: '11pt' }}>
          Penilaian Mandiri Lembaga Administrasi Negara
        </p>
      </>

      {/* Notification Banner */}
      <div className="bg-teal-700  p-4 rounded-md  text-white p-6 mt-4">
        Penilaian Mandiri EPSS 2024 sudah berakhir. Terima kasih atas kerjasama dan partisipasi aktif Bapak/Ibu.
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="card" style={{ backgroundColor: 'rgb(249, 250, 252)' }}>
            <div className="card-body p-1">
              <p className="text-center p-0 m-0 ps-2">Kegiatan Statistik</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow-md">
          <div className="card" style={{ backgroundColor: 'rgb(249, 250, 252)' }}>
            <div className="card-body p-1">
              <p className="text-center p-0 m-0 ps-2">Progres Penilaian Mandiri</p>
            </div>
          </div>
        </div>
      </div>


      




      {/* Progress Bar */}
      <div className="card-body">
        <div className="progress progress-white my-2" style={{ height: '4px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: '100%' }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Penilaian;

