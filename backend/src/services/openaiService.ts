import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log('OpenAI Key:', process.env.OPENAI_API_KEY);

export const getLessonFromAI = async (prompt: string): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });
    return completion.choices[0].message?.content || '';
  } catch (err: any) {
    console.error('OpenAI error:', err);
    return 'AI response error';
  }
};
