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

      <div className="p-6 bg-gray-100">
      <div className="grid grid-cols-4 gap-4 mt-4">
        {/* First Column (Left) */}
        <div className="col-span-2 bg-white shadow-md p-4">
          <div className="flex flex-col space-y-4">
            {/* Kegiatan 1 */}
            <div>
              
              <p className="m-0 text-gray-800 text-lg font-normal">
                {/* Isi dari database untuk Kegiatan 1 */}
              </p>
              <span className="text-blue-600 text-xs">
                {/* Tahun dan Instansi dari database */}
              </span>
            </div>
            {/* Kegiatan 2 */}
            <div>
              
              <p className="m-0 text-gray-800 text-lg font-normal">
                {/* Isi dari database untuk Kegiatan 2 */}
              </p>
              <span className="text-blue-600 text-xs">
                {/* Tahun dan Instansi dari database */}
              </span>
            </div>
          </div>
        </div>

          {/* Second Column (Right) */}
          <div className="bg-teal-700 text-white p-4 rounded-md shadow-md">
          <div className="text-4xl font-semibold">38</div>
          <div>Indikator sudah lengkap diperiksa</div>
          
          {/* Progress Bar */}
          <div className="my-2">
            <div className="bg-gray-300 h-2 rounded">
              <div
                className="bg-white h-full rounded"
                style={{ width: '75%' }} // Change this value for the progress percentage
              ></div>
            </div>
          </div>

          {/* Progress Percentage */}
          <div className="text-sm">75% Completed</div>
        </div>
      </div>
    </div>
  

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


