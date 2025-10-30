import Link from "next/link"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-3xl font-bold">🔧</div>
          <div>
            <h1 className="text-2xl font-bold">Santexnika.uz</h1>
            <p className="text-sm opacity-90">24/7 Xizmat</p>
          </div>
        </div>
        <nav className="flex gap-6">
          <Link href="/" className="hover:opacity-80 transition">
            Bosh sahifa
          </Link>
        </nav>
      </div>
    </header>
  )
}
