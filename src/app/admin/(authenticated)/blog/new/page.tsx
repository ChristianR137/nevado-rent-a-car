import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import BlogForm from './BlogForm';

export default async function NewOrEditBlogPage({
    params
}: {
    params: { id?: string }
}) {
    let initialData = undefined;

    // Si hay un ID provisto en la ruta, se trata de una Edición
    if (params.id) {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('blogs')
            .select('*')
            .eq('id', params.id)
            .single();

        if (error || !data) {
            notFound();
        }

        initialData = data;
    }

    return (
        <div className="max-w-6xl animate-fade-in mx-auto">
            <BlogForm initialData={initialData} />
        </div>
    );
}
