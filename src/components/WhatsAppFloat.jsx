import WhatsAppCircleButton from './WhatsAppCircleButton.jsx'

export default function WhatsAppFloat() {
  return (
    <WhatsAppCircleButton
      className="fixed bottom-5 right-5 z-[60] flex md:hidden hover:scale-110"
      aria-label="Abrir WhatsApp para solicitar cotización"
    />
  )
}
