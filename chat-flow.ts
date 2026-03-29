'use server';

/**
 * @fileOverview SRISHTI Chat Flow connected to Live Ngrok AI Backend.
 */

export async function chatFlow(input: string): Promise<string> {
  const trimmed = input.trim().toLowerCase();
  
  // Specific response for "hi" or empty input as requested
  if (!trimmed || trimmed === 'hi' || trimmed === 'hello') {
    return "Hi I am SRISHTI, Your Virtual ASI Agent. How can I assist for you today?";
  }

  try {
    // Calling the live ngrok backend API with bypass header
    const response = await fetch('https://upsetly-unfructified-dorethea.ngrok-free.dev/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': '69420'
      },
      body: JSON.stringify({
        message: input
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Ngrok connection failed');
    }

    const data = await response.json();
    
    // Using response.reply correctly from the backend as requested
    if (data && data.reply) {
      return data.reply;
    }
    
    return "I am processing your strategic request. Please try again.";
  } catch (error) {
    console.error("Backend Error:", error);
    return "AI not reachable. Please try again.";
  }
}
