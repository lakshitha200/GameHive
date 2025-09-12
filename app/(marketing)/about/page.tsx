export default function AboutPage() {
  return (
    <main className="container mx-auto px-6 py-16 space-y-16">
      <section className="text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          About GameHive
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg md:text-xl">
          GameHive is your ultimate hub for discovering games, connecting with other gamers, and staying updated with the latest news.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <img
            src="/images/logo.png" // replace with actual public image
            alt="About Image"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            To provide a modern platform for gamers worldwide, offering the best games, news, and community experience.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Vision</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg">
            To be the go-to hub for gaming enthusiasts everywhere and make discovering and playing games seamless.
          </p>
        </div>
      </section>
    </main>
  );
}
