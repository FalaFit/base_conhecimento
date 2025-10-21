export default async function handler(req, res) {
  // Headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Responde OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  // Só aceita POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Encaminha para n8n
  try {
    const n8nUrl = 'https://planejamentocomercialtvx.app.n8n.cloud/webhook/9d54034b-156c-473a-8a81-5cd73cc2b63d';
    
    const response = await fetch(n8nUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Erro ao chamar n8n:', error);
    return res.status(500).json({ 
      error: 'Erro ao processar requisição',
      details: error.message 
    });
  }
}
