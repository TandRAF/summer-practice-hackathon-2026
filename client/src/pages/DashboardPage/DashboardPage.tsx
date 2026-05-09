import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAvailability } from '../../hooks/useAvailability';
import { useGroups } from '../../hooks/useGroups';
import type { GroupMemberModel } from '../../types/groups';
import styles from './DashboardPage.module.scss';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const { availability, loading: availLoading, submitAvailability } = useAvailability();
  const { myGroups, loading: groupsLoading, respondToMatch } = useGroups();

  // ── Derived state ────────────────────────────────────────────────────────
  const isUnanswered = !availability || availability.is_available === null;
  const isAvailable  = availability?.is_available === true;
  const isOptedOut   = availability?.is_available === false;

  // Groups split by status
  const pendingGroups   = myGroups?.filter((m) => m.status === 'Joined')     ?? [];
  const confirmedGroups = myGroups?.filter((m) => m.status === 'Confirmed')  ?? [];
  const declinedGroups  = myGroups?.filter((m) => m.status === 'Declined')   ?? [];

  // ── Loading ──────────────────────────────────────────────────────────────
  if (availLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingBar} />
        <span className={styles.label}>LOADING SYSTEM DATA...</span>
      </div>
    );
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dashboard</h1>
        <p className={styles.headerSub}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      {/* ── DAILY CHECK-IN ─────────────────────────────────────────────── */}
      {isUnanswered && (
        <section className={styles.card}>
          <span className={styles.label}>DAILY CHECK-IN</span>
          <h2 className={styles.title}>ShowUpToday?</h2>
          <p className={styles.metaData}>Let the system know — one click is all it takes.</p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton} onClick={() => submitAvailability(true)}>
              ✓ I'm In
            </button>
            <button className={styles.secondaryButton} onClick={() => submitAvailability(false)}>
              ✗ Not Today
            </button>
          </div>
        </section>
      )}

      {/* ── OPTED OUT ──────────────────────────────────────────────────── */}
      {isOptedOut && (
        <section className={styles.card}>
          <span className={styles.label}>STATUS: INACTIVE</span>
          <h2 className={styles.title}>You've opted out for today.</h2>
          <p className={styles.metaData}>Changed your mind?</p>
          <div className={styles.buttonGroup} style={{ marginTop: 16 }}>
            <button className={styles.primaryButton} onClick={() => submitAvailability(true)}>
              ✓ Actually, I'm In
            </button>
          </div>
        </section>
      )}

      {/* ── ACTIVE — groups section ─────────────────────────────────────── */}
      {isAvailable && (
        <>
          {/* Pending — needs response */}
          <section className={styles.card}>
            <span className={styles.label}>ACTION REQUIRED — {pendingGroups.length} match{pendingGroups.length !== 1 ? 'es' : ''}</span>
            <h2 className={styles.title}>Awaiting Your Response</h2>

            {groupsLoading ? (
              <div className={styles.loadingBar} />
            ) : pendingGroups.length === 0 ? (
              <p className={styles.metaData}>No pending matches right now. Check back soon.</p>
            ) : (
              <ul className={styles.groupList}>
                {pendingGroups.map((member: GroupMemberModel) => (
                  <li key={member.id}>
                    <div className={styles.groupInfo}>
                      
                      {/* SPORT TITLE + AI SCORE BADGE */}
                      <h3 className={styles.sportName} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {member.match_groups?.sports?.name ?? 'Sport Match'}
                        <span style={{ fontSize: '10px', fontWeight: 800, border: '1px solid #000', padding: '2px 6px', letterSpacing: '0.05em' }}>
                          ⚡ AI SCORE: {member.match_groups?.system_compatibility_score ? `${member.match_groups.system_compatibility_score}%` : 'CALCULATING'}
                        </span>
                      </h3>

                      <p className={styles.metaData}>
                        DATE: {member.match_groups?.match_date}
                        {' | '}
                        ROLE: {member.is_captain ? 'CAPTAIN' : 'MEMBER'}
                        {' | '}
                        GROUP: {member.match_groups?.status?.toUpperCase()}
                      </p>
                    </div>

                    <div className={styles.actionGroup}>
                      <button
                        className={styles.primaryButton}
                        onClick={() => respondToMatch(member.id, 'Confirmed')}
                      >
                        CONFIRM
                      </button>
                      <button
                        className={styles.secondaryButton}
                        onClick={() => respondToMatch(member.id, 'Declined')}
                      >
                        DECLINE
                      </button>
                      
                      {/* FIXED NAVIGATION */}
                      <button
                        className={styles.ghostButton}
                        onClick={() => navigate(`/group/${member.match_groups?.id}`)}
                      >
                        VIEW →
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Confirmed matches */}
          {confirmedGroups.length > 0 && (
            <section className={styles.card}>
              <span className={styles.label}>CONFIRMED — {confirmedGroups.length} match{confirmedGroups.length !== 1 ? 'es' : ''}</span>
              <h2 className={styles.title}>You're Going</h2>
              <ul className={styles.groupList}>
                {confirmedGroups.map((member: GroupMemberModel) => (
                  <li key={member.id}>
                    <div className={styles.groupInfo}>
                      
                      {/* SPORT TITLE + AI SCORE BADGE */}
                      <h3 className={styles.sportName} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {member.match_groups?.sports?.name ?? 'Sport Match'}
                        <span style={{ fontSize: '10px', fontWeight: 800, border: '1px solid #000', padding: '2px 6px', letterSpacing: '0.05em' }}>
                          ⚡ AI SCORE: {member.match_groups?.system_compatibility_score ? `${member.match_groups.system_compatibility_score}%` : 'CALCULATING'}
                        </span>
                      </h3>

                      <p className={styles.metaData}>
                        DATE: {member.match_groups?.match_date}
                        {' | '}
                        ROLE: {member.is_captain ? 'CAPTAIN' : 'MEMBER'}
                      </p>
                    </div>
                    <div className={styles.actionGroup}>
                      <span className={`${styles.tag} ${styles.active}`}>CONFIRMED</span>
                      
                      {/* FIXED NAVIGATION */}
                      <button
                        className={styles.ghostButton}
                        onClick={() => navigate(`/group/${member.match_groups?.id}`)}
                      >
                        OPEN CHAT →
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Declined matches */}
          {declinedGroups.length > 0 && (
            <section className={styles.card}>
              <span className={styles.label}>DECLINED — {declinedGroups.length} match{declinedGroups.length !== 1 ? 'es' : ''}</span>
              <h2 className={styles.title}>Passed On</h2>
              <ul className={styles.groupList}>
                {declinedGroups.map((member: GroupMemberModel) => (
                  <li key={member.id}>
                    <div className={styles.groupInfo}>
                      <h3 className={styles.sportName}>
                        {member.match_groups?.sports?.name ?? 'Sport Match'}
                      </h3>
                      <p className={styles.metaData}>
                        DATE: {member.match_groups?.match_date}
                      </p>
                    </div>
                    <span className={styles.tag}>DECLINED</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Empty state when matched but no groups yet */}
          {!groupsLoading && myGroups?.length === 0 && (
            <section className={styles.card}>
              <span className={styles.label}>MATCHING SYSTEM: ACTIVE</span>
              <h2 className={styles.title}>Searching for your squad...</h2>
              <p className={styles.metaData}>
                You're marked as available. The algorithm is finding compatible players for your sport preferences. Check back in a moment.
              </p>
            </section>
          )}
        </>
      )}
    </div>
  );
};