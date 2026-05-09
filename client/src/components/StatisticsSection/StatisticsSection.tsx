import styles from './StatisticsSection.module.scss';

interface StatCard {
    text?: string;
    number?: string;
    image?: string;    
    imageAlt?: string; 
}

interface Props {
    heading: string;
    description: string;
    avatars?: string[]; 
    avatarText?: string;
    cards: StatCard[];
}

export const StatisticsSection = ({ heading, description, avatars, avatarText, cards }: Props) => {
  return (
    <section className={styles['statistics-section']}>
        
        <div className={styles['statistics-section--left']}>
            <div className={styles['statistics-section--main-text']} >
                <h2>{heading}</h2>
                <p className={styles['statistics-section--desc']}>{description}</p>
            </div>

            {avatars && avatars.length > 0 && (
                <div className={styles['statistics-section--avatar-area']}>
                    <div className={styles['statistics-section--avatars']}>
                        {avatars.map((src, index) => (
                            <img key={index} src={src} alt={`Avatar ${index + 1}`} loading="lazy" />
                        ))}
                    </div>
                    {avatarText && <p>{avatarText}</p>}
                </div>
            )}
        </div>

        <div className={styles['statistics-section--right']}>
            {cards.map((card, index) => (
                <div key={index} className={styles['statistics-section--card']}>
                    {card.image ? (
                        <img 
                            src={card.image} 
                            alt={card.imageAlt || 'Imagine statistici'} 
                            className={styles['statistics-section--card-image']}
                            loading="lazy" 
                        />
                    ) : (
                        <>
                            {card.text && <p className={styles['statistics-section--card-text']}>{card.text}</p>}
                            {card.number && <h3 className={styles['statistics-section--card-number']}>{card.number}</h3>}
                        </>
                    )}
                </div>
            ))}
        </div>
        
    </section>
  );
}