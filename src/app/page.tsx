import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Welcome Here!</h1>
        

      </main>
      <footer className={styles.footer}>
        <a href="#A">Link A</a>
        <a href="#B">Link B</a>
        <a href="#C">Link C</a>
      </footer>
    </div>
  );
}
