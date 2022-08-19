import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  return (
    <nav>
      <ol className="flex ml-2">
        <li className="mr-6">
          <Link
            to={routes.home()}
            className="text-blue-500 hover:text-blue-800"
          >
            Home
          </Link>
        </li>
        <li className="mr-6">
          <Link
            to={routes.widgets()}
            className="text-blue-500 hover:text-blue-800"
          >
            Widgets
          </Link>
        </li>
      </ol>
    </nav>
  )
}

export default Navigation
