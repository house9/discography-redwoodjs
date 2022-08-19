type PageTitleProps = {
  title: string
  children?: React.ReactNode
}

const PageTitle = ({ title, children }: PageTitleProps) => {
  return (
    <header className="flex items-center p-4">
      <h2 className="flex-auto text-4xl">{title}</h2>
      <div className="flex-none w-64">{children}</div>
    </header>
  )
}

export default PageTitle
