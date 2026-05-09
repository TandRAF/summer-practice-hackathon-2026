import { Button } from "../../components/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import styles from "./UiKitPage.module.scss";

export const UiKitPage = () => {
  return (
    <div className={styles.uiKitContainer}>
      <header className={styles.header}>
        <h1 className={styles.header__title}>Design System & UI Kit</h1>
        <p className={styles.header__description}>Ghid de referință pentru componentele reutilizabile.</p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.section__title}>1. Butoane</h2>
        
        <div className={styles.componentGroup}>
          
          <div className={styles.componentRow}>
            <h3 className={styles.subTitle}>Variante</h3>
            <div className={styles.buttonFlex}>
              <Button variant="solid">Primary</Button>
              <Button variant="outline">Secondary</Button>
              <Button variant="text">Ghost</Button>
            </div>
          </div>

          <div className={styles.componentRow}>
            <h3 className={styles.subTitle}>Dimensiuni</h3>
            <div className={styles.buttonFlex}>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          <div className={styles.componentRow}>
            <h3 className={styles.subTitle}>Cu Iconițe (MUI)</h3>
            <div className={styles.buttonFlex}>
              <Button icon={<AddIcon />} iconPosition="left">Adaugă</Button>
              <Button icon={<DownloadIcon />} iconPosition="right" variant="outline">Descarcă</Button>
              <Button icon={<AddIcon />} size="sm" /> 
            </div>
          </div>
          
          <div className={styles.componentRow}>
            <h3 className={styles.subTitle}>Stări</h3>
            <div className={styles.buttonFlex}>
              <Button disabled>Dezactivat Primary</Button>
              <Button variant="outline" disabled>Dezactivat Secondary</Button>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};