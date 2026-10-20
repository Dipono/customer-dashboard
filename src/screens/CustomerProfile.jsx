import React from 'react';
import { Mail, Calendar, Crown } from 'lucide-react';

const CustomerProfile = ({ profile }) => {
  if (!profile) return null;

  const initials = profile.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const joinDate = new Date(profile.joinDate).toLocaleDateString('en-ZA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="profile-card">
      <div className="profile-avatar">{initials}</div>
      <div className="profile-info">
        <h2>{profile.name}</h2>
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Mail size={14} /> {profile.email}
        </p>
        <p style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
          <Calendar size={14} /> Member since {joinDate}
        </p>
        <span className="profile-badge">
          <Crown size={12} style={{ marginRight: '4px' }} />
          {profile.accountType}
        </span>
      </div>
    </div>
  );
};

export default CustomerProfile;