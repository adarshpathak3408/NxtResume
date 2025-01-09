import UploadResume from './components/UploadResume';
import JobRoleInput from './components/JobRoleInput';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Resume Scanner</h1>
        <UploadResume />
        <JobRoleInput />
      </div>
    </div>
  );
}

export default App;
