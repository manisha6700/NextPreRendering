import Link from 'next/link'


function Home() {
  return <>
  <h1>Next JS pre-rendering</h1>
  <Link href="/users">
    <a>Users</a>
  </Link>
  {/* while using link the user data in form of
  json and html is already loaded while loading
  the index file and hence no additional
  network fetch is required */}
  {/* But while routing through the URL individual
  file and it's components are loaded */}
  </>
}

export default Home

