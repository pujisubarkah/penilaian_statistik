import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUploader from '../components/FileUploader';
import { supabase } from '../supabaseClient';
import 'font-awesome/css/font-awesome.min.css';
import Sidebar from '../components/Sidebar'; // Import Sidebar

// Constants
const TOTAL_PAGES = 15; // Total number of questionnaire pages
const QUESTION_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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
  const [unitKerja, setUnitKerja] = useState(null);
  const [fileUrl, setFileUrl] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
  const [summaryContent, setSummaryContent] = useState('');

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

  // Fetch levels from Supabase
  useEffect(() => {
    const fetchLevels = async () => {
      const { data: levelData, error: levelError } = await supabase
        .schema('simbatik')
        .from('level')
        .select('id, level_nama, level_penjelasan');

      if (levelError) console.error('Error fetching levels:', levelError);
      else setLevels(levelData || []);
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

      if (questionError) console.error('Error fetching question:', questionError);
      else setCurrentQuestion(questionData || null);
    };
    fetchQuestion();
  }, [currentPage]);

  const handleLevelClick = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleContentChange = (value) => {
    setContent(value);
  };

  // Function to handle final save
  const handleFinalSave = async () => {
    if (!selectedLevel || !content.trim()) {
      alert('Silakan pilih level dan isi penjelasan sebelum menyimpan.');
      return;
    }

    try {
      const { error } = await supabase
        .schema('simbatik')
        .from('penilaian')
        .insert([{
          user_id: (await supabase.auth.getUser()).data.user.id,
          level_id: selectedLevel,
          question_id: QUESTION_IDS[currentPage - 1],
          penjelasan: content,
          file_url: fileUrl || '',
        }]);

      if (error) {
        console.error('Error saving final data:', error);
        alert('Terjadi kesalahan saat menyimpan data final.');
      } else {
        alert('Data final berhasil disimpan!');
        // Reset states
        setSelectedLevel(null);
        setContent('');
        setCurrentPage(1);
        setFileUrl('');
        setIsModalOpen(false); // Close modal on successful save
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan data final.');
    }
  };

  // Function to handle lightbulb click
const handleLightbulbClick = () => {
  if (currentQuestion) {
    console.log('currentQuestion:', currentQuestion); // Debugging line
    const summary = `Indikator: ${currentQuestion.indikator_nama}\nDeskripsi: ${currentQuestion.indikator_penjelasan}`;

    setSummaryContent(summary); // Set the modal content to the deskripsi of indikator
    setIsModalOpen(true); // Open modal
    console.log('summaryContent:', summary); // Debugging line
  } else {
    console.log('No current question available.');
  }
};


  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  // Removed unused scrollToQuestion function
  

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-lg">
      <h1 className="text-xl font-bold mb-4">PENILAIAN MANDIRI</h1>
      <p className="text-gray-600 mb-6">Penilaian Mandiri {unitKerja ? `Unit Kerja ${unitKerja}` : 'Loading...'}</p>

      <div className="flex justify-between items-center mb-6">
        <div>
        <button onClick={toggleSidebar} className="bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded mr-2">
  <i className="fa fa-ellipsis-v text-white cursor-pointer"></i> RINGKASAN
</button>

          <button onClick={handleFinalSave} className="bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded">
            FINAL
          </button>
        </div>



        {/* Pagination Controls */}
        <div className="flex">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className={`px-4 py-2 bg-teal-600 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <i className="fa fa-chevron-left"></i>
          </button>
          <button disabled={currentPage === TOTAL_PAGES} onClick={() => setCurrentPage(currentPage + 1)} className={`px-4 py-2 bg-teal-600 text-white rounded ${currentPage === TOTAL_PAGES ? 'opacity-50 cursor-not-allowed' : ''} ml-2`}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4 mb-6">
        {currentQuestion && (
          <>
            <div className="flex items-center">
              <h2 className="text-lg font-semibold mb-2">Indikator {currentQuestion.indikator_id}</h2>
              <svg 
                onClick={handleLightbulbClick} // Trigger modal on click
                xmlns="http://www.w3.org/2000/svg" 
                className="w-8 h-8 ml-2 text-yellow-500 cursor-pointer"
                fill="currentColor" 
                viewBox="0 0 24 24" 
                title="Informasi tentang indikator" 
                aria-hidden="true">
                <path d="M9 21h6v-1H9v1zm3-19C7.48 2 4 5.48 4 10c0 2.53 1.4 4.78 3.5 6v3.5c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5V16c2.1-1.22 3.5-3.47 3.5-6 0-4.52-3.48-8-7.5-8zM12 4c3.31 0 6 2.69 6 6 0 1.73-.75 3.29-2.05 4.36l-.45.38v3.76h-7v-3.76l-.45-.38C6.75 13.29 6 11.73 6 10c0-3.31 2.69-6 6-6z"/>
              </svg>
            </div>
            <p className="text-gray-600 mb-4">{currentQuestion.indikator_deskripsi}</p>
          </>
        )}

        {/* Render other elements for each question page */}
      </div>

       {/* Levels Section */}
       <div className="space-y-2">
          {levels.length > 0 && levels.map((level) => (
            <div className="p-4 border rounded-lg" key={level.id}>
              <div onClick={() => handleLevelClick(level.id)} className={`p-4 border rounded-lg cursor-pointer transition ${selectedLevel === level.id ? 'bg-teal-600 text-white' : 'bg-white'} hover:bg-teal-600 hover:text-white`}>
                <h3 className="font-semibold">{level.level_nama}</h3>
                <p className="text-gray-600">{level.level_penjelasan}</p>
              </div>
            </div>
          ))}
        </div>

      {/* Render Editor */}
      <div className="border rounded mb-4 p-4">
        <ReactQuill value={content} onChange={handleContentChange} />
      </div>

     

      {/* File Uploader */}
      <FileUploader onFileUpload={setFileUrl} />

      {/* Render Summary Modal */}
   
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <div className="bg-white max-w-md max-h-96 overflow-y-auto p-4 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold mb-2">Informasi Indikator</h2>
    <pre className="whitespace-pre-wrap">{summaryContent}</pre>
  </div>
</Modal>

    {/* Render Sidebar */}
    <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} content={summaryContent} />
  </div>
  );
}

export default Questionnaire;



