import styles from './SearchingSection.module.scss';

export const SearchingSection = () => (
  <div className={styles.matchCard}>
    <div className={styles.cardTop}>
      <h5 className={styles.cardTitle}>Căutăm coechipieri...</h5>
      <span className={styles.monoText}>ID: #44291</span>
    </div>
    <p className={styles.cardDesc}>Preferințe: Fotbal, Baschet • 5km distanță</p>
    <div className={styles.progressBar}>
      <div className={styles.progressFill} style={{ width: '65%' }}></div>
    </div>
    <p className={styles.progressText}>Căutăm în 3/5 cozi de așteptare</p>
  </div>
);