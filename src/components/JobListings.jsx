function JobListings({ jobs }) {
    return (
      <div className="mt-4">
        <h2>Matched Jobs</h2>
        <ul>
          {jobs.map((job, index) => (
            <li key={index} className="border p-2 rounded mb-2">
              <h3>{job.title}</h3>
              <p>Required Skills: {job.skills.join(', ')}</p>
              <a href={job.link} target="_blank" rel="noopener noreferrer">
                Apply Here
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default JobListings;
  