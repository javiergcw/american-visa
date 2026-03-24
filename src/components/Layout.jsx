import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppFloat from './WhatsAppFloat.jsx'
import CTADesktopFloat from './CTADesktopFloat.jsx'
import BackToTop from './BackToTop.jsx'

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CTADesktopFloat />
      <BackToTop />
    </>
  )
}
