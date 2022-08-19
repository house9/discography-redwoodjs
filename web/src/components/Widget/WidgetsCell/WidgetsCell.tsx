import type { FindWidgets } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Widgets from 'src/components/Widget/Widgets'

export const QUERY = gql`
  query FindWidgets {
    widgets {
      id
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No widgets yet. '}
      <Link
        to={routes.newWidget()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ widgets }: CellSuccessProps<FindWidgets>) => {
  return <Widgets widgets={widgets} />
}
