const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://example.supabase.co', 'eyJhbGci');
let q = supabase.from('vehicles').select('*');
q = q.or('name.ilike.%A%');
q = q.or('brand.ilike.%B%');
console.log(q.url.toString());
