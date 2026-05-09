import React, { useState } from 'react';
import { useSports } from '../../hooks/useSports'; // Ajustează calea
import styles from './SportsPage.module.scss';

export const SportsPage: React.FC = () => {
  const { sportsList, preferences, loading, savePreference } = useSports();
  const [savingId, setSavingId] = useState<string | null>(null);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Pro'] as const;

  const handleSelectSkill = async (sportId: string, skill: typeof skillLevels[number]) => {
    setSavingId(sportId);
    await savePreference(sportId, skill);
    setSavingId(null);
  };

  if (loading && sportsList.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingBar}></div>
        <p className={styles.skillLabel}>LOADING SPORTS REGISTRY...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Sports Portfolio</h1>
        <p>Select the sports you play and your corresponding skill level.</p>
      </header>

      <div className={styles.grid}>
        {sportsList.map((sport) => {
          // Căutăm dacă userul are deja acest sport salvat în preferințe
          const userPref = preferences.find(p => p.sport_id === sport.id);
          const isActive = !!userPref;

          return (
            <div key={sport.id} className={`${styles.card} ${isActive ? styles.activeCard : ''}`}>
              <h2 className={styles.sportName}>{sport.name}</h2>
              <span className={styles.skillLabel}>
                {savingId === sport.id ? 'UPDATING...' : 'SELECT SKILL LEVEL'}
              </span>
              
              <div className={styles.chipGroup}>
                {skillLevels.map((level) => {
                  const isLevelSelected = userPref?.skill_level === level;
                  return (
                    <button
                      key={level}
                      onClick={() => handleSelectSkill(sport.id, level)}
                      disabled={savingId === sport.id}
                      className={`${styles.skillChip} ${isLevelSelected ? styles.active : ''}`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};