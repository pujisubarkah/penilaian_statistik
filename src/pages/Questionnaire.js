import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../supabaseClient';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome styles if using npm

const TOTAL_PAGES = 15; // Total number of questionnaire pages
const QUESTION_IDS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, // Example question IDs
];

function Questionnaire() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [content, setContent] = useState('');
  const [levels, setLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  // Fetch levels from Supabase
  useEffect(() => {
    const fetchLevels = async () => {
      const { data: levelData, error: levelError } = await supabase
        .from('level_skor') // Specify the schema here
        .select('id, level_nama, level_penjelasan');

      if (levelError) {
        console.error('Error fetching levels:', levelError);
      } else {
        setLevels(levelData || []); // Set state to fetched levels
      }
    };

    fetchLevels();
  }, []);

  // Fetch current question based on currentPage
  useEffect(() => {
    const fetchQuestion = async () => {
      const questionId = QUESTION_IDS[currentPage - 1]; // Get the question ID for the current page
      const { data: questionData, error: questionError } = await supabase
        .from('indikator')
        .select('id, indikator_deskripsi')
        .eq('id', questionId)
        .single(); // Fetch a single question by ID

      if (questionError) {
        console.error('Error fetching question:', questionError);
      } else {
        setCurrentQuestion(questionData || null); // Set the current question state
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

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      console.log('Selected file:', file);
      // Implement your file upload logic here
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedLevel(null); // Reset selected level on page change
    setContent(''); // Reset content on page change
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Penilaian Mandiri</h1>

      {currentQuestion && (
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.indikator_deskripsi}</h2>
      )}

      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 border border-teal-600 text-teal-600 bg-transparent rounded hover:bg-teal-600 hover:text-white">
          Ringkasan
        </button>
        <button className="px-4 py-2 border border-white text-white bg-teal-600 rounded hover:bg-teal-500">
          FINAL
        </button>
      </div>

      {/* Teal Line Below Buttons */}
      <div className="border-b-2 border-teal-600 mb-6"></div>

      {/* Levels Section */}
      <div className="space-y-4">
        {levels.length > 0 && levels.map((level) => (
          <div 
            key={level.id} 
            onClick={() => handleLevelClick(level.id)}
            className={`p-4 border-2 border-blue-600 rounded cursor-pointer transition 
              ${selectedLevel === level.id ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'} 
              hover:bg-blue-500 hover:text-white`}
          >
            <strong>{level.level_nama}</strong>
            <p>{level.level_penjelasan}</p>
          </div>
        ))}
      </div>

      {/* Explanation Section */}
      <div className="p-2 max-w-4xl mx-auto">
        <h3 className="text-lg font-medium mb-2">Penjelasan</h3>
        <ReactQuill
          value={content}
          onChange={handleContentChange}
          theme="snow"
          placeholder="Tuliskan penjelasan Anda..."
          className="mb-4"
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ 'align': [] }],
              ['clean']
            ]
          }}
        />
      </div>

      {/* File Upload Section */}
      <div className="p-2 max-w-4xl mx-auto mt-6">
        <h3 className="text-lg font-medium mb-2">Bukti Dukung</h3>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded file:border-0
      file:text-sm file:font-semibold
      file:bg-teal-600 file:text-white
      hover:file:bg-teal-500" 
        />
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 bg-teal-600 text-white rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <i className="fa fa-chevron-left"></i> {/* Left Arrow Icon */}
        </button>
        <button
          disabled={currentPage === TOTAL_PAGES}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 bg-teal-600 text-white rounded ${currentPage === TOTAL_PAGES ? 'opacity-50 cursor-not-allowed' : ''} ml-2`}
        >
          <i className="fa fa-chevron-right"></i> {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
  );
}

export default Questionnaire;
