import styles from './Footer.module.scss';

interface Props {
    textColumns?: string[];
    brandName?: string;
    loginHref?: string;
}

export const Footer = ({ 
    textColumns = [
        "Brainstorming-ul deschis permite identificarea unor soluții inovatoare pe care un singur individ le-ar putea trece cu vederea.",
        "Fiecare membru aduce o viziune unică, bazată pe propriile cunoștințe și experiențe."
    ],
    brandName = "FeedBacker",
    loginHref = "/login"
}: Props) => {
  return (
    <footer className={styles['footer-container']}>
        
        <div className={styles['footer-container--top']}>
            <div className={styles['footer-container--columns']}>
                {textColumns.map((text, index) => (
                    <p key={index}>{text}</p>
                ))}
            </div>
            
            <a href={loginHref} className={styles['footer-container--login']}>
                Login
            </a>
        </div>

        <div className={styles['footer-container--bottom']}>
            <h1 className={styles['footer-container--brand']}>{brandName}</h1>
        </div>

    </footer>
  );
};