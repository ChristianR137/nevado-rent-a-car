const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function test() {
    const { data, error } = await supabase.from('vehicles').select('*').or('name.ilike.%Rav4%,brand.ilike.%Rav4%,type.ilike.%Rav4%').limit(1);
    console.log("Error:", error);
    console.log("Data:", data);
}
test();
