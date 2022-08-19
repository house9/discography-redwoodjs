import { MetaTags } from '@redwoodjs/web'

import PageTitle from 'src/components/PageTitle/PageTitle'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <PageTitle title="Home" />
    </>
  )
}

export default HomePage
