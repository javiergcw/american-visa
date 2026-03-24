/** Texto por defecto al armar una propuesta nueva (antes y después de los productos). */
export const DEFAULT_PROPOSAL_HEADER = 'American Visa Technology SAS'
export const DEFAULT_PROPOSAL_WELCOME =
  'Le damos la bienvenida. A continuación encontrará el detalle de los productos y servicios cotizados.'
export const DEFAULT_PROPOSAL_FAREWELL = 'Quedamos atentos a cualquier consulta. Cordial saludo.'

export function isProposalProductLine(line) {
  return line?.lineType !== 'text'
}

/** Separa líneas de texto (header / bienvenida / despedida) de productos para la vista pública. */
export function partitionPublicProposalSections(items) {
  const out = {
    headerText: DEFAULT_PROPOSAL_HEADER,
    welcomeText: DEFAULT_PROPOSAL_WELCOME,
    farewellText: DEFAULT_PROPOSAL_FAREWELL,
    productLines: [],
  }
  if (!Array.isArray(items)) return out
  for (const line of items) {
    if (!isProposalProductLine(line)) {
      if (line.textRole === 'header' && line.name?.trim()) out.headerText = line.name.trim()
      else if (line.textRole === 'welcome' && line.name?.trim()) out.welcomeText = line.name.trim()
      else if (line.textRole === 'farewell' && line.name?.trim()) out.farewellText = line.name.trim()
    } else {
      out.productLines.push(line)
    }
  }
  return out
}

function textLine(textRole, name) {
  return {
    lineType: 'text',
    textRole,
    name,
    price: 0,
    quantity: 1,
    productId: `__text_${textRole}__`,
  }
}

/** Encabezado + bienvenida + líneas de producto + despedida (total en importe solo suma productos). */
export function wrapProposalItemsWithDefaults(productItems) {
  return [
    textLine('header', DEFAULT_PROPOSAL_HEADER),
    textLine('welcome', DEFAULT_PROPOSAL_WELCOME),
    ...productItems,
    textLine('farewell', DEFAULT_PROPOSAL_FAREWELL),
  ]
}
