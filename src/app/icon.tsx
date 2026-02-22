import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = {
    width: 64,
    height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
    try {
        const imagePath = join(process.cwd(), 'public', 'logonevado.jpg');
        const imageData = readFileSync(imagePath);
        const base64Image = `data:image/jpeg;base64,${imageData.toString('base64')}`;

        return new ImageResponse(
            (
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '20%', // Bordes redondeados
                        overflow: 'hidden',
                        background: 'transparent',
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={base64Image}
                        alt="Logo"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            ),
            { ...size }
        );
    } catch (e) {
        return new Response('Failed to generate icon', { status: 500 });
    }
}
