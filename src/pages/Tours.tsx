import { Link } from "react-router-dom";

const Tours = () => (
  <main>
    <section className="relative h-[50vh] flex items-center justify-center gradient-hero">
      <div className="relative z-10 text-center px-4">
        <nav className="text-antigua-white/50 text-sm font-body mb-4">
          <Link to="/" className="hover:text-antigua-white">Home</Link> → Tours
        </nav>
        <h1 className="text-antigua-white">Explore Antigua Your Way</h1>
      </div>
    </section>
    <section className="py-20 container mx-auto px-4 text-center">
      <p className="text-charcoal/60 font-body text-lg">Full tours page coming soon. Check back for our complete tour catalog!</p>
      <Link to="/" className="inline-block mt-6 text-antigua-blue font-body font-semibold hover:underline">← Back to Home</Link>
    </section>
  </main>
);

export default Tours;
