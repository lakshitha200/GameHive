import { newsArticles } from "@/lib/data/news";

interface Props {
  params: { slug: string };
}

export default function NewsDetailPage({ params }: Props) {
  const article = newsArticles.find((n) => n.slug === params.slug);

  if (!article) return <p className="text-gray-600 dark:text-gray-300">Article not found.</p>;

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{article.title}</h1>
      <img src={article.image} alt={article.title} className="w-full h-64 object-cover rounded-xl mb-6" />
      <p className="text-gray-600 dark:text-gray-300">{article.content}</p>
      <p className="text-sm text-gray-400 mt-4">Published on: {article.date}</p>
    </div>
  );
}
