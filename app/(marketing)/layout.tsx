import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { EmergencyBadge } from '../components/EmergencyBadge'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <EmergencyBadge />
    </div>
  )
}
