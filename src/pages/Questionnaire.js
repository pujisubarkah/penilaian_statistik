import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../supabaseClient';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome styles if using npm
import { gapi } from 'gapi-script'; // Import gapi for Google API

const TOTAL_PAGES = 15; // Total number of questionnaire pages
const QUESTION_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, // Example question IDs
];

// Modal component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 shadow-lg max-w-lg w-full">
        <button onClick={onClose} className="text-red-500 float-right">
          &times;
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};


function Questionnaire() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [content, setContent] = useState('');
  const [levels, setLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [unitKerja, setUnitKerja] = useState(null); // State to hold unit kerja name
  const [fileUrl, setFileUrl] = useState(''); // State to hold file URL
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Fetch unit kerja for logged-in user
  useEffect(() => {
    const fetchUnitKerja = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('Error fetching user:', userError);
        return;
      }

      const userId = user ? user.id : null;
      if (userId) {
        const { data, error } = await supabase
          .schema('simbatik')
          .from('unit_kerja')
          .select('unit_kerja') // Adjust based on actual field name
          .eq('user_id', userId)
          .single();

        if (error) {
          console.error('Error fetching unit kerja:', error);
        } else {
          setUnitKerja(data?.unit_kerja || ''); // Set unit kerja state
        }
      }
    };

    fetchUnitKerja();
  }, []);

  // Fetch levels from Supabase
  useEffect(() => {
    const fetchLevels = async () => {
      const { data: levelData, error: levelError } = await supabase
        .schema('simbatik')
        .from('level')
        .select('id, level_nama, level_penjelasan');

      if (levelError) {
        console.error('Error fetching levels:', levelError);
      } else {
        setLevels(levelData || []);
      }
    };

    fetchLevels();
  }, []);

  // Fetch current question based on currentPage
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionId = QUESTION_IDS[currentPage - 1];
      const { data: questionData, error: questionError } = await supabase
        .schema('simbatik')
        .from('indikator')
        .select('*')
        .eq('id', questionId)
        .single();

      if (questionError) {
        console.error('Error fetching question:', questionError);
      } else {
        setCurrentQuestion(questionData || null);
      }
    };

    fetchQuestion();
  }, [currentPage]);

  const handleLevelClick = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      await uploadFileToGoogleDrive(file);
    }
  };

  const handleSave = async () => {
    if (!selectedLevel || !content.trim()) {
      alert('Silakan pilih level dan isi penjelasan.');
      return;
    }

    const { error } = await supabase
      .schema('simbatik')
      .from('penilaian') // Adjust table name as necessary
      .insert([{ level_id: selectedLevel, content }]);

    if (error) {
      console.error('Error saving data:', error);
      alert('Error saving data.');
    } else {
      alert('Data saved successfully!');
      setSelectedLevel(null);
      setContent('');
    }
  };

  const uploadFileToGoogleDrive = async (file) => {
    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Use environment variables
    const SCOPES = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

    // Load the Google API
    await new Promise((resolve) => {
      gapi.load('client:auth2', async () => {
        await gapi.auth2.init({
          client_id: CLIENT_ID,
          scope: SCOPES,
        });
        resolve();
      });
    });

    await gapi.auth2.getAuthInstance().signIn();

    const accessToken = gapi.auth.getToken().access_token;

    const metadata = {
      name: file.name,
      mimeType: file.type,
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);

    try {
      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: new Headers({ Authorization: 'Bearer ' + accessToken }),
          body: form,
        }
      );
      const result = await response.json();
      console.log('File uploaded successfully:', result);
      alert('File uploaded successfully to Google Drive!');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file to Google Drive.');
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedLevel(null);
    setContent('');
  };

  // Tambahkan di dalam fungsi Questionnaire, di bawah handleSave
  const handleFinalSave = async () => {
    // Periksa apakah level sudah dipilih dan ada konten yang diisi
    if (!selectedLevel || !content.trim()) {
      alert('Silakan pilih level dan isi penjelasan sebelum menyimpan.');
      return;
    }
  
    // Log the fileUrl to check its value
    console.log('File URL:', fileUrl);
  
    try {
      // Insert data ke tabel 'penilaian' di Supabase
      const { error } = await supabase
        .schema('simbatik')
        .from('penilaian') // Sesuaikan nama tabel jika berbeda
        .insert([
          {
            user_id: (await supabase.auth.getUser()).data.user.id, // Menggunakan user_id dari pengguna yang login
            level_id: selectedLevel, // Menyimpan level yang dipilih
            question_id: QUESTION_IDS[currentPage - 1], // Menyimpan ID pertanyaan berdasarkan halaman saat ini
            penjelasan: content, // Menyimpan konten dari ReactQuill ke field penjelasan
            file_url: fileUrl || '', // Ensure fileUrl is defined; use an empty string if not
          },
        ]);
  
      if (error) {
        console.error('Error saving final data:', error);
        alert('Terjadi kesalahan saat menyimpan data final.');
      } else {
        alert('Data final berhasil disimpan!');
        setSelectedLevel(null); // Reset level yang dipilih
        setContent(''); // Reset konten
        setCurrentPage(1); // Kembali ke halaman pertama atau sesuaikan sesuai kebutuhan
        setFileUrl(''); // Reset file URL after saving
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data final.');
    }
  };

  
  
  return (
    <div className="p-6 max-w-4xl mx-auto rounded-lg">
      <h1 className="text-xl font-bold mb-4">PENILAIAN MANDIRI</h1>
      <p className="text-gray-600 mb-6">Penilaian Mandiri {unitKerja ? `Unit Kerja ${unitKerja}` : 'Loading...'}</p>

      <div className="flex justify-between items-center mb-6">
        <div>
        <button
            onClick={() => setIsModalOpen(true)} // Open modal
            className="bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded mr-2"
          >
            <i className="fa fa-ellipsis-v text-white cursor-pointer"></i> RINGKASAN
          </button>
          <button
  onClick={handleFinalSave} // Tambahkan handler ini
  className="bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded"
>
  FINAL
</button>
        </div>

        {/* Pagination Controls */}
        <div className="flex">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-4 py-2 bg-teal-600 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
          <button
            disabled={currentPage === TOTAL_PAGES}
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-4 py-2 bg-teal-600 text-white rounded ${currentPage === TOTAL_PAGES ? 'opacity-50 cursor-not-allowed' : ''} ml-2`}
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 mb-6">
        {currentQuestion && (
          <>
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mb-2">Indikator {currentQuestion.indikator_id}</h2>
              <i className="fa fa-lightbulb text-yellow-500" title="Informasi tentang indikator" aria-hidden="true"></i>
            </div>
            <div className="ml-2"> {/* This div adds spacing between the icon and the text below */}
              <p className="text-xl font-semibold mb-2">{currentQuestion.indikator_nama}</p>
              <p className="text-gray-600 mb-4">{currentQuestion.indikator_deskripsi}</p>
            </div>
          </>
        )}
        <></>

        <div className="border-b-2 border-teal-600 mb-6"></div>

        {/* Levels Section */}
        <div className="space-y-2">
          {levels.length > 0 && levels.map((level) => (
            <div className="p-4 border rounded-lg" key={level.id}>
              <div
                onClick={() => handleLevelClick(level.id)}
                className={`p-4 border rounded-lg cursor-pointer transition 
                  ${selectedLevel === level.id ? 'bg-teal-600 text-white' : 'bg-white'} 
                  hover:bg-teal-600 hover:text-white`}
              >
                <h3 className="font-semibold">{level.level_nama}</h3>
                <p className="text-gray-600">{level.level_penjelasan}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ReactQuill Editor for Comments */}
        <div className="mt-4">
          <ReactQuill value={content} onChange={handleContentChange} />
        </div>

        {/* File Upload */}
        <input type="file" onChange={handleFileChange} className="mt-4" />

        {/* Save Button */}
        <button onClick={handleSave} className="mt-4 bg-teal-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <h2 className="text-lg font-semibold">Ringkasan</h2>
  <p>{currentQuestion ? currentQuestion.indikator_penjelasan : 'Loading...'}</p>
</Modal>
    </div>
  );
}

export default Questionnaire; 