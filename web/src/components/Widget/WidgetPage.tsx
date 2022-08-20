import WidgetCell from 'src/components/Widget/WidgetCell/'

type WidgetPageProps = {
  id: string
}

const WidgetPage = ({ id }: WidgetPageProps) => {
  return <WidgetCell id={id} />
}

export default WidgetPage
