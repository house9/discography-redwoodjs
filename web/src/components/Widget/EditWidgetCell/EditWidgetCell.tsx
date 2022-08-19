import type { EditWidgetById } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { CellSuccessProps, CellFailureProps, MetaTags } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PageTitle from 'src/components/PageTitle/PageTitle'
import WidgetForm from 'src/components/Widget/WidgetForm'

export const QUERY = gql`
  query EditWidgetById($id: String!) {
    widget: widget(id: $id) {
      id
      name
      description
    }
  }
`
const UPDATE_WIDGET_MUTATION = gql`
  mutation UpdateWidgetMutation($id: String!, $input: UpdateWidgetInput!) {
    updateWidget(id: $id, input: $input) {
      id
      name
      description
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ widget }: CellSuccessProps<EditWidgetById>) => {
  const [updateWidget, { loading, error }] = useMutation(
    UPDATE_WIDGET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Widget updated')
        navigate(routes.widgets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input, id) => {
    updateWidget({ variables: { id, input } })
  }

  const title = `Edit ${widget.name}`

  return (
    <>
      <MetaTags title={title} description="Edit Widget" />
      <PageTitle title={title} />

      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Edit Widget {widget.id}
          </h2>
        </header>
        <div className="rw-segment-main">
          <WidgetForm
            widget={widget}
            onSave={onSave}
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}
