import { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient'; // Ensure you import Supabase client

function FileUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null); // State to hold user ID

  // Fetch user ID when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else if (data.session) {
        setUserId(data.session.user.id); // Set user ID
      }
    };
    fetchUserId();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
    // Check if the file is under 3 MB
    if (selectedFile && selectedFile.size > 3 * 1024 * 1024) {
      setMessage('File size exceeds 3 MB. Please select a smaller file.');
      setFile(null);
    } else {
      setFile(selectedFile);
      setMessage('');
    }
  };

  const handleUpload = async () => {
    if (!file || !userId) return;
  
    const dropboxAccessToken = process.env.REACT_APP_DROPBOX_ACCESS_TOKEN;
    if (!dropboxAccessToken) {
      setMessage('Dropbox access token is missing. Please check your environment variables.');
      return;
    }
  
    setLoading(true); // Start loading state
  
    try {
      const folderPath = `/${userId}/`;
  
      // Upload the file to Dropbox
      const response = await axios.post(
        'https://content.dropboxapi.com/2/files/upload',
        file,
        {
          headers: {
            'Authorization': `Bearer ${dropboxAccessToken}`,
            'Content-Type': 'application/octet-stream',
            'Dropbox-API-Arg': JSON.stringify({
              path: `${folderPath}${file.name}`,
              mode: 'add',
              autorename: true,
              mute: false,
            }),
          },
        }
      );
  
      console.log('Dropbox Upload Response:', response.data); // Log Dropbox response
  
      // Get a temporary link to the uploaded file
      const linkResponse = await axios.post(
        'https://api.dropboxapi.com/2/sharing/create_shared_link_with_settings',
        {
          path: response.data.path_display,
        },
        {
          headers: {
            'Authorization': `Bearer ${dropboxAccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Dropbox Link Response:', linkResponse.data); // Log link response
  
      const fileUrl = linkResponse.data.url.replace('?dl=0', '?raw=1'); // Convert to direct download link
  
      // Save the file URL to Supabase
      const { data, error } = await supabase
        .from('simbatik.penilaian') // Specify the schema and table name
        .insert([{ file_url: fileUrl, user_id: userId }]); // Include user_id if needed
  
      if (error) throw error;
  
      console.log('Supabase Insert Response:', data); // Log Supabase response
      setMessage('Terima Kasih! File berhasil diupload.');
    } catch (error) {
      console.error("Error:", error);
      setMessage('File upload or URL saving failed: ' + error.message);
    } finally {
      setLoading(false); // End loading state
      setFile(null); // Clear the file after upload
    }
  };
  

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading} className="upload-btn">
        {loading ? 'Uploading...' : 'Upload File di sini, tidak lebih dari 3 MB'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUploader;
