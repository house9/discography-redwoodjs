import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import PageTitle from 'src/components/PageTitle/PageTitle'
import WidgetsCell from 'src/components/Widget/WidgetsCell'

const WidgetsPage = () => {
  return (
    <>
      <MetaTags title="Widgets" description="Widgets Index" />

      <PageTitle title="Widgets">
        <Link to={routes.newWidget()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Widget
        </Link>
      </PageTitle>
      <WidgetsCell />
    </>
  )
}

export default WidgetsPage
