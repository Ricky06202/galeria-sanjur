export function getIdFromRequest(request: Request) {
  const url = new URL(request.url)
  const parts = url.pathname.split('/')
  return parts[parts.length - 1]
}
