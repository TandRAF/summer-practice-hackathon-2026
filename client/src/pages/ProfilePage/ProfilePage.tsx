import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useProfile } from '../../hooks/useProfile';
import styles from './ProfilePage.module.scss';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaletteIcon from '@mui/icons-material/Palette';
import AnalyticsIcon from '@mui/icons-material/Analytics';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { profile, loading, saveProfile } = useProfile();
  const [isSaving, setIsSaving] = useState(false);

  if (loading) return <div className={styles.pageWrapper}>Loading...</div>;

  const displayName = profile?.full_name || profile?.username || 'User Account';
  const displayEmail = user?.email || 'Not provided';

  // Handle standard form submission
const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    
    const formData = new FormData(e.currentTarget);
    
    // 1. Extract the raw data
    const rawData = {
      full_name: formData.get('full_name') as string,
      location: formData.get('location') as string,
      timezone: formData.get('timezone') as string,
      biography: formData.get('biography') as string,
    };

    // 2. Filter out the empty strings so we only update what the user actually typed
    const updates = Object.fromEntries(
      Object.entries(rawData).filter(([_, value]) => value !== '')
    );

    // 3. Send the cleaned payload
    // If 'updates' is completely empty, you might want to skip the API call entirely!
    if (Object.keys(updates).length > 0) {
      await saveProfile(updates);
    }
    
    setIsSaving(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        
        {/* Profile Header */}
        <div className={styles.header}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatarPlaceholder}>
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className={styles.headerInfo}>
            <h1 className={styles.name}>{displayName}</h1>
            <p className={styles.email}>{displayEmail}</p>
            <div className={styles.badgeWrapper}>
              <span className={styles.badge}>System Member</span>
            </div>
          </div>
          <div>
            {/* The form attribute links this button to the form below */}
            <button 
              type="submit" 
              form="profile-form" 
              className={styles.editBtn}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className={styles.bentoGrid}>
          
          {/* Personal Information */}
          <section className={`${styles.section} ${styles.col8}`}>
            <h2 className={styles.sectionTitle}>Personal Information</h2>
            
            {/* Linked form to handle submit */}
            <form id="profile-form" className={styles.formGrid} onSubmit={handleSaveProfile}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Full Name</label>
                <input 
                  className={styles.input} 
                  name="full_name" 
                  type="text" 
                  defaultValue={profile?.full_name || ''} 
                  placeholder={profile?.username || ''}
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Email Address</label>
                <input 
                  className={styles.input} 
                  type="email" 
                  defaultValue={displayEmail} 
                  readOnly 
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Location</label>
                <input 
                  className={styles.input} 
                  name="location" 
                  type="text" 
                  defaultValue={profile?.location || ''} 
                  placeholder="e.g. London, UK"
                />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Timezone</label>
                <select 
                  className={styles.select} 
                  name="timezone" 
                  defaultValue={profile?.timezone || 'GMT (UTC+0)'}
                >
                  <option value="GMT (UTC+0)">GMT (UTC+0)</option>
                  <option value="EST (UTC-5)">EST (UTC-5)</option>
                  <option value="PST (UTC-8)">PST (UTC-8)</option>
                  <option value="EEST (UTC+3)">EEST (UTC+3)</option>
                </select>
              </div>
              <div className={`${styles.inputGroup} ${styles.colFull}`}>
                <label className={styles.label}>Biography</label>
                <textarea 
                  className={styles.textarea} 
                  name="biography"
                  rows={3} 
                  defaultValue={profile?.biography || ''}
                  placeholder="Describe your role and expertise..."
                />
              </div>
            </form>
          </section>

          {/* Account Settings */}
          <section className={`${styles.section} ${styles.col4}`}>
            <h2 className={styles.sectionTitle}>Account Settings</h2>
            <div className={styles.settingsWrapper}>
              <div className={styles.settingRow}>
                <span className={styles.settingName}>Two-Factor Auth</span>
                <span className={`${styles.settingStatus} ${styles.errorText}`}>DISABLED</span>
              </div>
              <div className={styles.settingRow}>
                <span className={styles.settingName}>Email Notifications</span>
                <span className={styles.settingStatus}>ACTIVE</span>
              </div>
              <div className={styles.settingRow}>
                <span className={styles.settingName}>API Access</span>
                <span className={styles.settingStatus}>READ-ONLY</span>
              </div>
              
              <div className={styles.actionStack}>
                <button className={styles.outlineBtn}>Change Password</button>
                <button onClick={logout} className={styles.dangerBtn}>Log Out</button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};