import React from "react";
import styles from "./ServiceCards.module.scss";

interface Card {
    icon: React.ReactNode; 
    image?: string; 
    imageAlt?: string;
    title: string;
    text: string;
}

interface Props {
    headding: string;
    headerText?: string;
    cards: Card[];
    contrastIndex?: number;
}

export const ServiceCards = ({ headding, headerText, cards, contrastIndex }: Props) => {
  return (
    <div className={styles['service-cards-container']}>
        <header>
            <h2 className={styles['service-cards-container--headding']}>{headding}</h2>
            {headerText && <p>{headerText}</p>}
        </header>

        <div className={styles['service-cards-container--grid']}>
            {cards.map((card, index) => {
                const isContrast = index === contrastIndex;

                return (
                    <div 
                        key={index} 
                        className={`${styles['service-cards-container--card']} ${isContrast ? styles['contrast'] : ''}`}
                    >
                        {card.image && (
                            <img 
                                src={card.image} 
                                alt={card.imageAlt || card.title} 
                                className={styles['service-cards-container--image']}
                                loading="lazy"
                            />
                        )}

                        <div className={styles['service-cards-container--icon']}>
                            {card.icon}
                        </div>
                        <h3>{card.title}</h3>
                        <p>{card.text}</p>
                    </div>
                );
            })}
        </div>
    </div>
  );
};