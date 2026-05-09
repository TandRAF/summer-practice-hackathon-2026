import styles from './MatchedSection.module.scss';

export const MatchedSection = () => (
  <div className={styles.matchCardSolid}>
    <div className={styles.cardTop}>
      <div className={styles.badges}>
        <div className={styles.badge}>MATCHED!</div>
        <div className={styles.badgeSolid}>CĂPITAN</div>
      </div>
      <span className={styles.monoText}>Start la 19:00</span>
    </div>
    <h5 className={styles.cardTitle}>Baschet 3v3</h5>
    <p className={styles.cardDesc}>Teren Central • 0.8km distanță</p>
    <button className={styles.actionBtn}>DESCHIDE CHAT GRUP</button>
  </div>
);