import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TelegramMessageRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = '8274639913';

    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN environment variable is not set');
    }

    const { name, email, phone, message }: TelegramMessageRequest = await req.json();

    // Format the message for Telegram
    const telegramMessage = `📩 New Website Inquiry
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message: ${message}`;

    // Send message to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML',
      }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      throw new Error(`Telegram API error: ${errorData.description || 'Unknown error'}`);
    }

    const telegramData = await telegramResponse.json();
    console.log('Message sent to Telegram successfully:', telegramData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent to Telegram successfully',
        telegram_response: telegramData 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in send-telegram-message function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Unknown error occurred' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});