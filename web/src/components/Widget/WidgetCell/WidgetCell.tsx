import type { FindWidgetById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Widget from 'src/components/Widget/Widget'

export const QUERY = gql`
  query FindWidgetById($id: String!) {
    widget: widget(id: $id) {
      id
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Widget not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ widget }: CellSuccessProps<FindWidgetById>) => {
  return <Widget widget={widget} />
}
