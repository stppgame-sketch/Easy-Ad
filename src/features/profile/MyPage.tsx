import PlaceholderPage from '../../components/ui/PlaceholderPage';
import { env } from '../../lib/env';

export default function MyPage() {
  return (
    <>
      <PlaceholderPage
        title="마이"
        icon="user"
        description="프로필, 포인트, 내 광고를 관리하는 화면이에요. 로그인 단계에서 만들어요."
      />
      <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--ink-faint)' }}>
        앱 버전 {env.appVersion}
      </p>
    </>
  );
}
