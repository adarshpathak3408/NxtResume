import { useState } from 'react';

function JobRoleInput() {
  const [jobRole, setJobRole] = useState('');

  const handleInputChange = (e) => {
    setJobRole(e.target.value);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={jobRole}
        onChange={handleInputChange}
        placeholder="Enter desired job role"
        className="border p-2 rounded"
      />
    </div>
  );
}

export default JobRoleInput;
