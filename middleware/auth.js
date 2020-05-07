
export default function ({route, req, res, redirect}) {
  const redirectURL = '/login'
  const token = ''
  const path = route.path

  if (path) {
    redirectURL = '/login?re=' + encodeURIComponent(path)
  }

  if (!token) {
    redirect(redirectURL)
  }
}
