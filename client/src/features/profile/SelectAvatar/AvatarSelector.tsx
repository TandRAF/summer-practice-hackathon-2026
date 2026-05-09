
import { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { useProfile } from '../../../hooks/useProfile';
import styles from './AvatarSelector.module.scss'; 

const PREDEFINED_AVATARS = [
  '/profilePictures/angry-raccoon.png',
  '/profilePictures/dead-raccoon.png',
  '/profilePictures/eating-racoon.png',
  '/profilePictures/angel-raccoon.png',
  '/profilePictures/mashroom-raccoon.png',
  '/profilePictures/magnetic-raccoon.png',
  '/profilePictures/knife-raccoon.png',
  '/profilePictures/question-raccoon.png',
  '/profilePictures/pirate-raccoon.png',
  '/profilePictures/school-raccoon.png',
  '/profilePictures/staying-raccoon.png',
  '/profilePictures/crying-raccoon.png',
  '/profilePictures/alchool-raccoon.png',
  '/profilePictures/king-raccoon.png',
  '/profilePictures/skull-raccoon.png',
];

const DEFAULT_AVATAR = "/profilePictures/eating-racoon.png";

export const AvatarSelector = () => {
  const { profile, loading, error, changeAvatar } = useProfile();
  
  const currentAvatar = profile?.avatar_url || DEFAULT_AVATAR;
  const [selectedUrl, setSelectedUrl] = useState<string>(currentAvatar);

  if (loading) return <div>Se încarcă profilul...</div>;
  if (error) return <div className={styles.error}>Eroare: {error}</div>;

  return (
    <div className={styles.container}>
      <h2>Alege-ți Avatarul</h2>
      
      <div className={styles.currentAvatarWrapper}>
        <img 
          src={currentAvatar} 
          alt="Avatar Curent" 
          className={styles.mainAvatar} 
        />
        <p>@{profile?.username}</p>
      </div>

      <div className={styles.selectionGrid}>
        <div className={styles.options}>
          {PREDEFINED_AVATARS.map((url, index) => (
            <img 
              key={index}
              src={url} 
              alt={`Opțiune avatar ${index + 1}`}
              onClick={() => setSelectedUrl(url)}
            />
          ))}
        </div>
        
        <Button 
          variant='solid' 
          size='lg' 
          onClick={() => changeAvatar(selectedUrl)}
          disabled={selectedUrl === currentAvatar}
        > 
          Save Profile Picture
        </Button>
      </div>
    </div>
  );
};