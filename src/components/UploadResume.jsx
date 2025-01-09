import { useState } from 'react';
import supabase from '../Supabase/supabase'; // Import Supabase client
import JobListings from './JobListings'; // Import the JobListings component

function UploadResume() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);
  const [resumeData, setResumeData] = useState(null); // Store the scanned resume data
  const [matchingJobs, setMatchingJobs] = useState([]); // Store the list of matched jobs
  const [scanComplete, setScanComplete] = useState(false); // Track scan completion

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setScanComplete(false); // Reset scan completion state when uploading a new resume

    // Create a unique file name
    const fileName = `${Date.now()}-${file.name}`;

    try {
      // Upload the file to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes') // Use your Supabase bucket name
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the file URL after uploading
      const fileUrl = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName).publicURL;

      setFileUrl(fileUrl); // Set the file URL for display

      // Now, call the Affinda API to scan the resume
      const formData = new FormData();
      formData.append('file', file); // Attach the file to form data
      formData.append('collection', 'fKYlgaFb'); // Add collection ID

      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer aff_f455af4fa704c9ee6c66bcf20862a9d4f93eb9e8', // Affinda API Key
        },
        body: formData, // Pass the form data as the request body
      };

      const response = await fetch('https://api.affinda.com/v3/documents', options);
      const resData = await response.json();

      // Log the full response for better error handling
      console.log("Full Response from Affinda:", resData);

      if (resData.errorCode || !resData.data) {
        alert('Error scanning resume: ' + JSON.stringify(resData.errorDetail || "Unknown error"));
        return;
      }

      setResumeData(resData); // Set the scanned resume data to state
      setScanComplete(true); // Set scan completion state to true
      alert('Resume uploaded and scanned successfully!');

      // Automatically trigger matching jobs after resume is scanned
      handleMatchJobs(resData); // Pass resume data to matching function

    } catch (error) {
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleMatchJobs = (resumeData) => {
    if (!resumeData || !resumeData.data || !resumeData.data.skills) {
      console.error("Invalid or missing resume data:", resumeData);
      alert("No skills found in the resume!");
      return;
    }

    // Log resume data to verify structure
    console.log("Resume Data for Matching Jobs:", resumeData);

    // Extract skills from resume data
    const resumeSkills = resumeData.data.skills?.map(skill => skill.name) || [];
    console.log("Extracted Resume Skills:", resumeSkills);

    if (resumeSkills.length === 0) {
      console.error("No skills found in the resume!");
      alert("No skills found in the resume!");
      return;
    }

    const matchedJobs = getMatchingJobs(resumeSkills);
    console.log('Matched Jobs:', matchedJobs);
    setMatchingJobs(matchedJobs);
  };

  // Function to simulate job matching based on resume skills
  const getMatchingJobs = (resumeSkills) => {
    // Simulated job listings
    const dummyJobList = [
      { title: 'Frontend Developer', skills: ['React', 'CSS', 'JavaScript'], link: 'https://example.com/job1' },
      { title: 'Backend Developer', skills: ['Node.js', 'Express', 'MongoDB'], link: 'https://example.com/job2' },
      { title: 'Full Stack Developer', skills: ['React', 'Node.js', 'MongoDB'], link: 'https://example.com/job3' },
    ];
  
    // Function to clean skill names (remove descriptions in parentheses)
    const cleanSkill = (skill) => skill.split('(')[0].trim().toLowerCase();
  
    // Normalize and clean resume skills
    const cleanedResumeSkills = resumeSkills.map(cleanSkill);
    console.log("Cleaned Resume Skills:", cleanedResumeSkills);
  
    // Return jobs where at least one cleaned skill matches
    const matched = dummyJobList.filter(job =>
      job.skills.some(jobSkill =>
        cleanedResumeSkills.includes(jobSkill.toLowerCase())
      )
    );
  
    console.log("Filtered Jobs after matching:", matched);
    return matched;
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-2 rounded"
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-4"
        onClick={handleUpload}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Resume'}
      </button>

      {fileUrl && (
        <div className="mt-4">
          <p>File uploaded successfully!</p>
          <a href={fileUrl} target="_blank" rel="noopener noreferrer">
            View Resume
          </a>
        </div>
      )}

      {scanComplete ? (
        matchingJobs.length === 0 ? (
          <p>No matching jobs found!</p>
        ) : (
          <JobListings jobs={matchingJobs} />
        )
      ) : null}
    </div>
  );
}

export default UploadResume;
