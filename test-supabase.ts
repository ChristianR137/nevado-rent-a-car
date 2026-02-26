import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vdthzgrncjeswfavsetq.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZkdGh6Z3JuY2plc3dmYXZzZXRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODQ1NTUsImV4cCI6MjA4NzM2MDU1NX0.fFoZlEK2VuTefO_gKOjEjQ7BAvcRJd-TijGzJA97z9o'
);

async function run() {
    const { data: vehicles } = await supabase.from('vehicles').select('id, name, images').order('created_at', { ascending: false }).limit(3);
    console.log("Latest Vehicles:");
    console.log(JSON.stringify(vehicles, null, 2));

    const { data: buckets } = await supabase.storage.listBuckets();
    console.log("\nStorage Buckets:");
    console.log(JSON.stringify(buckets, null, 2));
}

run();
