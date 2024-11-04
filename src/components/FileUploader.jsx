import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Ensure you import the configured Supabase client

function FileUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  // Fetch user ID on component mount
  useEffect(() => {
    const fetchUserId = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
      } else if (data.session) {
        setUserId(data.session.user.id);
      }
    };
    fetchUserId();
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
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
  
    setLoading(true);
    try {
      // Define the storage path, e.g., use user ID as a folder
      const filePath = `${userId}/${file.name}`;
  
      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('User_uploads') // Updated bucket name to match your bucket
        .upload(filePath, file);
  
      if (error) throw error;
  
      // Get the public URL (if bucket is public) or use getSignedUrl for private access
      const { publicURL, error: urlError } = supabase.storage
        .from('User_uploads')
        .getPublicUrl(filePath);
  
      if (urlError) throw urlError;
  
      // Optionally: Save the file URL to your Supabase database
      const { error: dbError } = await supabase
        .from('simbatik.penilaian') // Specify schema and table
        .insert([{ file_url: publicURL, user_id: userId }]);
  
      if (dbError) throw dbError;
  
      setMessage('File uploaded successfully!');
      console.log('File URL:', publicURL);
    } catch (error) {
      console.error("Error:", error);
      setMessage('File upload failed: ' + error.message);
    } finally {
      setLoading(false);
      setFile(null);
    }
  };
  

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || loading} className="upload-btn">
        {loading ? 'Uploading...' : 'Upload File (max 3 MB)'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUploader;
