import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import WidgetForm from 'src/components/Widget/WidgetForm'

const CREATE_WIDGET_MUTATION = gql`
  mutation CreateWidgetMutation($input: CreateWidgetInput!) {
    createWidget(input: $input) {
      id
    }
  }
`

const NewWidget = () => {
  const [createWidget, { loading, error }] = useMutation(
    CREATE_WIDGET_MUTATION,
    {
      onCompleted: () => {
        toast.success('Widget created')
        navigate(routes.widgets())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input) => {
    createWidget({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Widget</h2>
      </header>
      <div className="rw-segment-main">
        <WidgetForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewWidget
