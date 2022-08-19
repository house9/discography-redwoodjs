// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />

        <Set>
          <Route path="/widgets/new" page={WidgetNewWidgetPage} name="newWidget" />
          <Route path="/widgets/{id}/edit" page={WidgetEditWidgetPage} name="editWidget" />
          <Route path="/widgets/{id}" page={WidgetWidgetPage} name="widget" />
          <Route path="/widgets" page={WidgetWidgetsPage} name="widgets" />
        </Set>

        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
