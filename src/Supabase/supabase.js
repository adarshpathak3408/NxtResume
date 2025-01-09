import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fbqgdhcwgeodnhqfacdh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZicWdkaGN3Z2VvZG5ocWZhY2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwOTI0NjQsImV4cCI6MjA1MTY2ODQ2NH0.cg88KpxL-ygraJu_Ps_6qOtnww0cDgLEhvqoDJzyR08'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
