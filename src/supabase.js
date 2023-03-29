import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fsciiobemmrejkltmovi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzY2lpb2JlbW1yZWprbHRtb3ZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MzA0MzEsImV4cCI6MTk5NTUwNjQzMX0.pRdKhBYPziuMyRwxnXBpQT8tjt39o-PFrjQ5SpI3QTg'

export const supabase = createClient(supabaseUrl, supabaseKey)