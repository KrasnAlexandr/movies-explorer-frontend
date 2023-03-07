import styles from './SectionTitle.module.css';

export const SectionTitle = ({ children }) => (
  <h2 className={styles.title}>{children}</h2>
);
