import React, { useState } from 'react';
import { useGroups } from '../../hooks/useGroups';
import { useChat } from '../../hooks/useChat';
import type { ChatMessageModel } from '../../types/chat';
import { type GroupMemberDetail, type GroupMemberModel, type MatchGroupModel } from '../../types/groups';
import { groupsService } from '../../services/groupsService';
import styles from './GroupsPage.module.scss';

// ---------------------------------------------------------------------------
// Hook: useGroupDetails
// ---------------------------------------------------------------------------
const useGroupDetails = (groupId: string | null) => {
  const [group, setGroup] = React.useState<MatchGroupModel | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!groupId) {
      setGroup(null);
      return;
    }
    setLoading(true);
    setError(null);
    groupsService
      .getGroupDetails(groupId)
      .then((data: MatchGroupModel) => setGroup(data))
      .catch((err: any) =>
        setError(err.response?.data?.error || 'Failed to fetch group details')
      )
      .finally(() => setLoading(false));
  }, [groupId]);

  return { group, loading, error };
};

// ---------------------------------------------------------------------------
// Component: GroupPage
// ---------------------------------------------------------------------------
export const GroupsPage: React.FC = () => {
  const { myGroups, loading: groupsLoading, error: groupsError, respondToMatch } = useGroups();
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const { group: currentGroup, loading: detailsLoading, error: detailsError } = useGroupDetails(selectedGroupId);
  const { messages, sendMessage } = useChat(selectedGroupId ?? '');
  const [inputText, setInputText] = useState('');

  const selectedMember: GroupMemberModel | undefined = myGroups?.find(
    (m: GroupMemberModel) => m.match_groups.id === selectedGroupId
  );
  const isCaptain = selectedMember?.is_captain;

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText('');
  };

  // ── LIST VIEW ──────────────────────────────────────────────────────────────
  if (!selectedGroupId) {
    if (groupsLoading) return <div className={styles.loading}>LOADING YOUR GROUPS...</div>;
    if (groupsError) return <div className={styles.loading}>ERROR: {groupsError}</div>;

    return (
      <div className={styles.listPage}>
        <h1 className={styles.pageTitle}>MY GROUPS</h1>

        {myGroups.length === 0 ? (
          <p className={styles.empty}>You have no groups yet.</p>
        ) : (
          <div className={styles.groupList}>
            {myGroups.map((member: GroupMemberModel) => {
              const group = member.match_groups;
              return (
                <div
                  key={member.id}
                  className={styles.groupCard}
                  onClick={() => setSelectedGroupId(group.id)}
                >
                  <div className={styles.groupCardLeft}>
                    <span className={styles.sportName}>{group.sports?.name ?? 'Sport'}</span>
                    <span className={styles.matchDate}>{group.match_date}</span>
                  </div>

                  <div className={styles.groupCardRight}>
                    {member.is_captain && (
                      <span className={styles.captainBadge}>CAPTAIN</span>
                    )}
                    <span className={`${styles.statusTag} ${styles[member.status.toLowerCase()]}`}>
                      {member.status}
                    </span>
                    <span className={styles.groupStatus}>{group.status}</span>
                  </div>

                  {member.status === 'Joined' && (
                    <div
                      className={styles.respondButtons}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className={styles.confirmBtn}
                        onClick={() => respondToMatch(member.id, 'Confirmed')}
                      >
                        CONFIRM
                      </button>
                      <button
                        className={styles.declineBtn}
                        onClick={() => respondToMatch(member.id, 'Declined')}
                      >
                        DECLINE
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // ── DETAIL VIEW ────────────────────────────────────────────────────────────
  if (detailsLoading) return <div className={styles.loading}>LOADING MATCH SECRETS...</div>;
  if (detailsError) return <div className={styles.loading}>ERROR: {detailsError}</div>;

  return (
    <div className={styles.layout}>

      {/* LEFT SIDEBAR — your status + match info */}
      <aside className={styles.sidebar}>
        <button
          className={styles.backBtn}
          onClick={() => setSelectedGroupId(null)}
        >
          ← BACK TO GROUPS
        </button>

        <h2>Your Status</h2>
        <div className={styles.memberItem}>
          <span>{isCaptain ? 'You (Captain)' : 'You'}</span>
          {isCaptain && <span className={styles.captainBadge}>CAPTAIN</span>}
        </div>
        <div className={styles.statusLabel}>
          STATUS: {selectedMember?.status.toUpperCase() ?? '—'}
        </div>

        {selectedMember?.status === 'Joined' && (
          <div className={styles.respondButtons} style={{ marginTop: 16 }}>
            <button
              className={styles.confirmBtn}
              onClick={() => respondToMatch(selectedMember.id, 'Confirmed')}
            >
              CONFIRM
            </button>
            <button
              className={styles.declineBtn}
              onClick={() => respondToMatch(selectedMember.id, 'Declined')}
            >
              DECLINE
            </button>
          </div>
        )}

        {currentGroup && (
          <div style={{ marginTop: 32 }}>
            <h2>Match Info</h2>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Sport</span>
              <span>{currentGroup.sports?.name ?? '—'}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Date</span>
              <span>{currentGroup.match_date}</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Status</span>
              <span>{currentGroup.status}</span>
            </div>
          </div>
        )}
      </aside>

      {/* CENTER — Chat */}
      <main className={styles.chatArea}>
        <div className={styles.messageList}>
          {messages.length === 0 ? (
            <p className={styles.empty}>No messages yet. Say hi!</p>
          ) : (
            messages.map((msg: ChatMessageModel) => (
              <div
                key={msg.id}
                className={`${styles.message} ${
                  msg.sender_id === selectedMember?.id ? styles.ownMessage : ''
                }`}
              >
                <div className={styles.sender}>{msg.sender_id.slice(0, 8)}</div>
                <div className={styles.text}>{msg.content}</div>
                <div className={styles.time}>
                  {new Date(msg.sent_at).toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
        </div>

        <div className={styles.inputArea}>
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>SEND</button>
        </div>
      </main>

      {/* RIGHT SIDEBAR — all team members */}
      <aside className={`${styles.sidebar} ${styles.right}`}>
        <h2>Team Members</h2>

        {currentGroup?.group_members && currentGroup.group_members.length > 0 ? (
          currentGroup.group_members.map((member: GroupMemberDetail) => (
            <div key={member.profiles.username} className={styles.memberItem}>
              <div className={styles.memberInfo}>
                <span className={styles.username}>@{member.profiles.username}</span>
                <span className={styles.fullName}>{member.profiles.full_name}</span>
              </div>
              <div className={styles.badgeGroup}>
                {member.is_captain && (
                  <span className={styles.captainBadge}>CAPTAIN</span>
                )}
                <span className={`${styles.statusTag} ${styles[member.status.toLowerCase()]}`}>
                  {member.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.empty}>No members found.</p>
        )}
      </aside>

    </div>
  );
};
