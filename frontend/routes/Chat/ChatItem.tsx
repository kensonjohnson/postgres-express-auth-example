import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.min.css";
import styles from "./ChatItem.module.css";

type ChatItemProps = ChatObject;

const marked = new Marked(
  markedHighlight({
    langPrefix: "hljs language-",
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  })
);

export function ChatItem({ role, content }: ChatItemProps) {
  const html = marked.parse(content) as string;

  return (
    <div className={styles.container}>
      <h3>{role}</h3>
      <div
        className={styles.output}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
