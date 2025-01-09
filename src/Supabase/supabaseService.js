import supabase from './supabase'; // Import the Supabase client from the correct location

// Function to save jobs to Supabase
export const saveJobsToSupabase = async (jobs) => {
  for (const job of jobs) {
    const { data, error } = await supabase
      .from('jobs')  // Replace 'jobs' with your table name
      .insert([
        {
          title: job.title,
          company: job.company.display_name,
          url: job.redirect_url,
          description: job.description,
        },
      ]);

    if (error) {
      console.error('Error saving job:', error);
    } else {
      console.log('Job saved successfully:', data);
    }
  }
};
