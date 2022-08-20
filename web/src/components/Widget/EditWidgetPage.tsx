import EditWidgetCell from 'src/components/Widget/EditWidgetCell/'

type WidgetPageProps = {
  id: string
}

const EditWidgetPage = ({ id }: WidgetPageProps) => {
  return <EditWidgetCell id={id} />
}

export default EditWidgetPage
