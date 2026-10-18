import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       model:  'openai/gpt-oss-120b', // তুমি যে মডেল সিলেক্ট করেছিলে
        messages: [
          {
            role: 'system',
            content: 'You are an expert developer. Summarize the provided GitHub issue in 3 clear bullet points and state the difficulty level (Beginner, Intermediate, Advanced).'
          },
          {
            role: 'user',
            content: text
          }
        ],
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    
    // Groq থেকে আসা রেসপন্স
    const resultText = data.choices[0].message.content;

    return NextResponse.json({ result: resultText });

  }  catch (error: any) {
  console.error("Backend Error:", error);
  return NextResponse.json({ error: error.message }, { status: 500 });
}
}