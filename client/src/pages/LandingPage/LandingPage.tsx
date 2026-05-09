import { TextBanner } from "../../components/TextBanner/TextBanner"
import { ServiceCards } from "../../components/ServiceCards/ServiceCards"
import styles from "./LandingPage.module.scss"
import bannerImage from "../../assets/landingImages/bg-image.png"

import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import { StatisticsSection } from "../../components/StatisticsSection/StatisticsSection";
import { FirstSection } from "../../components/FirstSection/FirstSection"
import screenImage from "../../assets/landingImages/screen-image.png"
import { Footer } from "../../layouts/Footer/Footer";

export const LandingPage = () => {
    const statsData = [
        {
            text: "Dintre utilizatori declară că fac mai mult sport de când folosesc ShowUp2Move datorită sistemului de matching.",
            number: "85%"
        },
        {
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=60",
            imageAlt: "Echipa pe teren"
        },
        {
            image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=500&q=60",
            imageAlt: "Activitate sportivă"
        },
        {
            text: "Rata de confirmare a meciurilor generate automat prin notificările noastre zilnice de tip 'ShowUpToday?'.",
            number: "92%"
        }
    ];

    const serviceCardsData = [
        {
            title: "Matching Inteligent",
            text: "Grupuri generate automat pe baza preferințelor tale, nivelului de skill și locației.",
            icon: <LightbulbOutlinedIcon />
        },
        {
            title: "Căpitan Automat",
            text: "Sistemul desemnează un coordonator pentru fiecare grup, asigurând organizarea fără efort.",
            icon: <HandshakeOutlinedIcon />
        },
        {
            title: "Logistică Simplă",
            text: "Chat dedicat pentru fiecare meci și asistență rapidă pentru găsirea terenurilor libere.",
            icon: <RocketLaunchOutlinedIcon />
        },
        {
            title: "Comunitate Activă",
            text: "Conectează-te cu oameni noi care împărtășesc pasiunea ta pentru un stil de viață dinamic.",
            icon: <TrendingUpOutlinedIcon />
        }
    ];

const avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4"
];

    return (
        <>
            <div className={styles['landing-container']}>
                <FirstSection
                    imageSrc={screenImage}
                    title="Gata de mișcare?"
                    headingTitle="Misiunea Noastră"
                    headerText="Eliminăm barierele dintre tine și sportul preferat. Fără planificări complicate, doar sport pur și conexiuni reale."
                    footerTitle="Despre ShowUp2Move"
                    footerText="O platformă socială inteligentă care transformă 'ar trebui să ies la fotbal' în 'ne vedem pe teren în 30 de minute'."
                />
                <TextBanner
                    imageSrc={bannerImage}
                    headding="Spune 'Da' sănătății tale astăzi"
                    headerText="Sistemul nostru 'ShowUpToday?' te întreabă zilnic dacă ai timp de mișcare. Un singur click și ești deja pe drum spre echipă."
                    footerText="Algoritmul nostru te potrivește cu grupuri care au același nivel de experiență și proximitate ca tine, reducând fricțiunea organizării."
                />
                <ServiceCards
                    headding="Cum funcționează?"
                    headerText="Tot ce ai nevoie pentru a trece de la canapea la competiție, într-o singură aplicație intuitivă."
                    cards={serviceCardsData}
                    contrastIndex={1}
                />
                <StatisticsSection
                    heading="Sportul e mai bun împreună"
                    description="Reducem timpul de organizare cu până la 85%, lăsându-ți mai mult timp pentru ceea ce contează cu adevărat: jocul."
                    avatars={avatars}
                    avatarText="Alătură-te sutelor de jucători care au acceptat provocarea astăzi."
                    cards={statsData}
                />
                <Footer
                    brandName="ShowUp2Move"
                    loginHref="/auth"
                    textColumns={[
                        "Transformăm orașul tău într-un teren de joacă vibrant și accesibil oricui.",
                        "Ai o întrebare sau vrei să parteneriezi cu noi? Contactează echipa ShowUp2Move."
                    ]}
                />
            </div>
        </>
    )
}