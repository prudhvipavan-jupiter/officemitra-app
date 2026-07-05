import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { slugify } from "@/lib/cms/types";

function headingId(children: React.ReactNode): string {
  const text = String(children)
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim();
  return slugify(text);
}

const components: Components = {
  h2: ({ children }) => {
    const id = headingId(children);
    return (
      <h2 id={id} className="scroll-mt-24">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = headingId(children);
    return (
      <h3 id={id} className="scroll-mt-24">
        {children}
      </h3>
    );
  },
  a: ({ href, children }) => (
    <a href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}>
      {children}
    </a>
  ),
};

export function ArticleMarkdown({ body }: { body: string }) {
  return <ReactMarkdown components={components}>{body}</ReactMarkdown>;
}
