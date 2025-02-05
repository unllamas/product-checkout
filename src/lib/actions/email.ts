export async function sendEmail(email: string, secretCode: string) {
    // 1. Generate QR code using free API service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(secretCode)}&size=200x200`;
  
    // 2. Email body 
    const emailBody = `
      <div className="max-w-md mx-auto p-5 font-sans text-center items-center">
        <h2 className="text-gray-800 text-center text-xl mb-4 font-semibold">
            ¡Tu entrada para el Coworking!
        </h2>
        
        <div className="mb-6">
            <p className="text-base text-center text-gray-700 mb-2">
            Presenta este código único al ingresar:
            </p>
            <div className="flex justify-center">
            <strong className="text-lg tracking-wider font-mono bg-gray-100 px-4 py-2 rounded-lg border border-gray-200">
                ${secretCode}
            </strong>
            </div>
        </div>

        <div className="mb-6 items-center">
            <img 
            src=${qrUrl} 
            alt="Código QR de acceso" 
            className="mx-auto border border-gray-300 p-2 rounded-lg w-48 h-48" 
            />
        </div>

        <p className="text-gray-500 text-sm text-center">
            Escanea el código QR o presenta el código alfanumérico
        </p>
    </div>`;
  
    // 3. Send email using Plunk API
    try {
      const response = await fetch('https://api.useplunk.com/v1/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.NEXT_PLUNK_API_KEY}`
        },
        body: JSON.stringify({
          to: email,
          subject: 'Tu código de acceso al Coworking',
          body: emailBody,
          options: {
            html: true
          }
        })
      });
  
      if (!response.ok) throw new Error('Error al enviar el email');
      return await response.json();
  
    } catch (error) {
      console.error('Error en sendEmail:', error);
      throw error;
    }
}