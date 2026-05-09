import styles from './AvailabilitySection.module.scss';

interface AvailabilitySectionProps {
  onConfirm: () => void;
  onDecline: () => void;
}

export const AvailabilitySection = ({ onConfirm, onDecline }: AvailabilitySectionProps) => (
  <section className={styles.heroCard}>
    <div className={styles.heroContent}>
      <h3 className={styles.heroTitle}>Ești gata de joc astăzi?</h3>
      <p className={styles.heroText}>
        Sunt 14 meciuri active în apropierea ta. Confirmă disponibilitatea pentru a fi adăugat automat într-o echipă.
      </p>
      <div className={styles.heroActions}>
        <button className={styles.btnPrimary} onClick={onConfirm}>DA, SUNT DISPONIBIL! ⚡</button>
        <button className={styles.btnOutline} onClick={onDecline}>NU ASTĂZI</button>
      </div>
    </div>
  </section>
);