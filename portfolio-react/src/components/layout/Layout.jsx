import PropTypes from 'prop-types'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout