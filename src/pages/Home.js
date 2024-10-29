import { React, useState } from 'react';
import Footer from '../components/Footer';

function Home() {
    const [activeTab, setActiveTab] = useState('Rintisan');

    const renderContent = () => {
      switch (activeTab) {
        case 'Rintisan':
          return 'Proses penyelenggaraan Statistik Sektoral belum dilakukan oleh seluruh unit kerja.';
        case 'Terkelola':
          return 'Proses penyelenggaraan Statistik Sektoral telah dilakukan oleh seluruh unit kerja, namun masih menggunakan standar yang hanya berlaku di unit kerja itu sendiri. Jika standar yang digunakan juga diterapkan pada sebagian unit kerja lain dalam satu organisasi yang sama, maka masih berada di level ini.';
        case 'Terdefinisi':
          return 'Proses penyelenggaraan Statistik Sektoral telah diharmonisasi dan kemudian ditetapkan sebuah standar/pedoman oleh unit yang melaksanakan fungsi manajemen dan berlaku untuk seluruh unit kerja dalam organisasi.';
        case 'Terpadu dan Terukur':
          return 'Proses penyelenggaraan Statistik Sektoral telah dilakukan secara terpadu dan telah berkontribusi pada kinerja organisasi. Kinerja penyelenggaraan Statistik Sektoral dapat diukur melalui kegiatan reviu dan evaluasi pada setiap proses.';
        case 'Optimum':
          return 'Proses penyelenggaraan Statistik Sektoral telah dilakukan peningkatan kualitas secara berkesinambungan berdasarkan hasil reviu dan evaluasi.';
        default:
          return '';
      }
    };

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
        <h1 className="text-2xl font-bold mb-4">MENGENAL EPSS</h1>
        <p className="mb-4">
          Badan Pusat Statistik (BPS) sebagai lembaga statistik nasional menjadi salah satu instansi penghasil data dan informasi statistik di Indonesia, berkomitmen untuk menyediakan statistik yang berkualitas. Di sisi lain BPS terus berupaya mewujudkan dan mengembangkan Sistem Statistik Nasional (SSN) berupa optimalisasi sumber daya dalam penyelenggaraan statistik agar tercipta SSN yang andal, efektif dan efisien. BPS harus meningkatkan perannya dalam aspek koordinasi, integrasi, sinkronisasi dan standardisasi (KISS) dengan seluruh penyelenggara kegiatan statistik, serta perannya sebagai Pembina dalam penyelenggaraan statistik sektoral.
        </p>
        <p className="mb-4">
          Di Indonesia, institusi dan lembaga penghasil data atau informasi statistik bukan hanya BPS. Unit kerja pemerintahan seperti Kementerian, Lembaga Non Kementerian, Instansi Daerah juga bertanggung jawab terhadap tersedianya statistik sektoral berupa data dan informasi statistik yang berkualitas. Dalam posisinya sebagai Pembina statistik, BPS perlu mengetahui seberapa besar capaian pembangunan dalam bidang perstatistikan nasional seperti diamanatkan dalam UU No 16 Tahun 1997 tentang Statistik dan Perpres 39/2019 tentang Satu Data Indonesia.
        </p>
        <div className="bg-yellow-100 p-4 mb-4">
          <p className="text-lg font-bold text-orange-600">
            Indeks Pembangunan Statistik (IPS) menggambarkan tingkat kematangan (maturity level) dari pelaksanaan penyelenggaraan statistik sektoral di Instansi Pemerintah Pusat dan Pemerintah Daerah.
          </p>
        </div>
        <p>
          Pemantauan dan Evaluasi Penyelenggaraan Statistik Sektoral merupakan proses penilaian terhadap pelaksanaan penyelenggaraan statistik sektoral di Instansi Pemerintah Pusat dan Pemerintah Daerah untuk menghasilkan suatu nilai Indeks Pembangunan Statistik (IPS) yang menggambarkan tingkat kematangan (maturity level) dari pelaksanaan penyelenggaraan statistik sektoral di Instansi Pemerintah Pusat dan Pemerintah Daerah.
        </p>
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">TUJUAN EPSS</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="border p-4 rounded-lg">
          <p className="text-teal-600 font-bold">Mengukur capaian kemajuan</p>
          <p>penyelenggaraan Statistik Sektoral pada Instansi Pusat dan Pemerintahan Daerah</p>
        </div>
        <div className="border p-4 rounded-lg">
          <p className="text-teal-600 font-bold">Meningkatkan kualitas penyelenggaraan Statistik Sektoral</p>
          <p>pada Instansi Pusat dan Pemerintahan Daerah</p>
        </div>
        <div className="border p-4 rounded-lg">
          <p className="text-teal-600 font-bold">Meningkatkan kualitas pelayanan publik</p>
          <p>di bidang statistik pada Instansi Pusat dan Pemerintahan Daerah</p>
        </div>
        </div>
        <h2 className="text-xl font-bold mb-4">Peraturan Terkait</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <p className="text-teal-600 font-bold mb-2">PERATURAN BADAN PUSAT STATISTIK NOMOR 3 TAHUN 2022 TENTANG EVALUASI PENYELENGGARAAN STATISTIK SEKTORAL (EPSS)</p>
          <p>
          Peraturan Badan Pusat Statistik Nomor 3 Tahun 2022 tentang Evaluasi Penyelenggaraan Statistik Sektoral merupakan wujud komitmen BPS dalam menghasilkan Indeks Pembangunan Statistik untuk mendukung Sistem Statistik Nasional yang andal, efektif, dan efisien. Perban tersebut juga berisi pedoman dalam rangka melaksanakan penilaian penyelenggaraan Statistik Sektoral pada Instansi Pusat dan Pemerintahan Daerah.
          </p>
        </div>
        <div className="border p-4 rounded-lg">
          <iframe src="https://drive.google.com/file/d/1Y-rq3pgWlXC2Fe4tMeFEwO7ENI0MF0sE/preview" width="640" height="480" allow="autoplay"></iframe>
        </div>
        </div>
      </div>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Penilaian</h1>
        <div className="flex">
        <div className="w-1/2 pr-4">
          <p className="mb-4">
          Dalam menilai perkembangan kapabilitas organisasi dalam penyelenggaraan Statistik Sektoral, Badan Pusat Statistik menggunakan <i>Capability Maturity Model</i> CMM. Model ini telah dikembangkan untuk mengukur berbagai tingkat kematangan lain, seperti tingkat kematangan tata kelola teknologi informasi dan komunikasi, tingkat kematangan manajemen pengetahuan, dan lain-lain.
          </p>
          <p className="mb-4">
          Tingkat kematangan kapabilitas proses merupakan pengukuran kemampuan organisasi pada suatu proses yang digunakan untuk pengukuran tingkat kematangan kebijakan, tata kelola, dan manajemen penyelenggaraan Statistik Sektoral. Tingkat kematangan kapabilitas proses diukur dengan 5 lima tingkatan yaitu rintisan, terkelola, terdefinisi, terpadu dan terukur, dan optimum.
          </p>
        </div>
        <div className="w-1/2 bg-teal-700 text-white rounded-lg p-4">
          <div className="flex mb-4">
          <button
            className={`py-2 px-4 ${activeTab === 'Rintisan' ? 'bg-white text-teal-700 font-semibold' : ''}`}
            onClick={() => setActiveTab('Rintisan')}
          >
            Rintisan
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'Terkelola' ? 'bg-white text-teal-700 font-semibold' : ''}`}
            onClick={() => setActiveTab('Terkelola')}
          >
            Terkelola
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'Terdefinisi' ? 'bg-white text-teal-700 font-semibold' : ''}`}
            onClick={() => setActiveTab('Terdefinisi')}
          >
            Terdefinisi
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'Terpadu dan Terukur' ? 'bg-white text-teal-700 font-semibold' : ''}`}
            onClick={() => setActiveTab('Terpadu dan Terukur')}
          >
            Terpadu dan Terukur
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'Optimum' ? 'bg-white text-teal-700 font-semibold' : ''} rounded-tr-lg`}
            onClick={() => setActiveTab('Optimum')}
          >
            Optimum
          </button>
          </div>
          <div className="bg-white text-teal-700 p-4 rounded-lg">
          {renderContent()}
          </div>
        </div>
        </div>
        <Footer />
      </div>
      </div>
    );
  }

  export default Home;
