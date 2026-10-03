import { profile } from '@/content/profile';

import { Arrow } from './Arrow';
import { LocalTime } from './LocalTime';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>
          {profile.name} / {profile.chineseName}
        </strong>
        <span>{profile.location.label}</span>
      </div>
      <div>
        <LocalTime />
        <span>{profile.location.coordinates}</span>
      </div>
      <div>
        <a href={profile.links.github} rel="me noreferrer" target="_blank">
          GitHub <Arrow />
        </a>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
