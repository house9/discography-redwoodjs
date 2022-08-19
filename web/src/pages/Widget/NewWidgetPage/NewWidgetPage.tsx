import { MetaTags } from '@redwoodjs/web'

import PageTitle from 'src/components/PageTitle/PageTitle'
import NewWidget from 'src/components/Widget/NewWidget'

const NewWidgetPage = () => {
  return (
    <>
      <MetaTags title="New Widget" description="New Widget" />

      <PageTitle title="New Widget" />
      <NewWidget />
    </>
  )
}

export default NewWidgetPage
