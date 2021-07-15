import { SiteClient } from 'datocms-client'

export default async function addCommunity(request, response) {

  if (request.method !== "POST") {
    response.status(400).json({ 
      message: "Método inválido",
      error: true,      
      data: {}
    })
  }

  // Copiar e colar a Full Access API Token do DatoCMS
  const TOKEN = '9b2bc0d42d2eb3c0f3a404217f4a54'
  const client = new SiteClient(TOKEN)
  const { title, imageUrl, creatorSlug } = request.body

  const record = await client.items.create({
    itemType: "967060", // Model ID da coleção
    title,
    imageUrl,
    creatorSlug
  })

  response.json({
    message: 'Criado novo conteúdo na coleção Community',
    error: false,
    data: record
  })

  return
}

// Informe o Model ID no campo itemType.
// Para obter o Model ID da coleção Community, entre na opção
// Definições, Modelos, Community, Editar Modelo.
// Cada modelo tem um Model ID diferente.
