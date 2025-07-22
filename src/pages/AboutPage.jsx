import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h1>About This Project</h1>
        <p className={styles.intro}>
          Welcome to <strong>M.Shop</strong> — a modern, responsive e-commerce demo project built with <strong>React</strong> and <strong>FakeStore API</strong>.  
          This project showcases my skills in building a professional front-end architecture, state management, and clean UI/UX design.
        </p>

        <div className={styles.features}>
          <h2>Key Features</h2>
          <ul>
            <li>Dynamic product listing with categories and price filtering.</li>
            <li>Detailed product pages with color, size, and quantity selection.</li>
            <li>Shopping cart with live item count and order summary.</li>
            <li>Search functionality with real-time results.</li>
            <li>Fully responsive design with mobile hamburger menu.</li>
            <li>Clean, modern UI with custom styling and animations.</li>
          </ul>
        </div>

        <div className={styles.creator}>
          <h2>About the Creator</h2>
          <p>
            This project was developed by <strong>Rasool Vahid</strong>, a passionate front-end developer and React enthusiast.  
            You can explore more of my work on my GitHub profile:
          </p>
          <a
            href="https://github.com/mutopia7"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.githubLink}
          >
            Visit My GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
