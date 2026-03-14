import styles from "./page.module.css";
import AIResearchAssistant from "./components/AIResearchAssistant";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <AIResearchAssistant />
      </main>
    </div>
  );
}
