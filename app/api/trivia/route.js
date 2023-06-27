import Trivia from '@/models/trivia';
import { connectToDatabase } from '@/utils/database';
import { headers } from 'next/headers';

export const GET = async (request) => {
  const headersList = headers();
  const referer = headersList.get('referer');
  try {
    await connectToDatabase();

    const trivias = await Trivia.find({}).populate('creator');
    return new Response(JSON.stringify(trivias), {
      status: 200,
      headers: {
        referer: referer,
        'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
      },
    });
  } catch (error) {
    return new Response('Failed to fetch all trivias', { status: 500 });
  }
};