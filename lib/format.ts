export const finalPrice = (price: number, discount: number) =>
  Math.round(price * (100 - discount)) / 100;

export const money = (n: number) => `$${n.toFixed(2)}`;

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const readTime = (paragraphs: string[]) =>
  `${Math.max(1, Math.round(paragraphs.join(" ").split(/\s+/).length / 200))} min read`;
