import { Route, Routes } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import LoginPage from './features/auth/LoginPage';
import HomePage from './features/home/HomePage';
import RegionPage from './features/region/RegionPage';
import WritePage from './features/ads/WritePage';
import AlertsPage from './features/notifications/AlertsPage';
import MyPage from './features/profile/MyPage';

// 화면 주소(경로)와 화면을 연결하는 곳입니다.
// 새 화면이 생기면 여기에 한 줄만 추가합니다.
export default function App() {
  return (
    <Routes>
      {/* 로그인 화면은 하단 메뉴 없이 전체 화면으로 보여줍니다. */}
      <Route path="login" element={<LoginPage />} />

      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="region" element={<RegionPage />} />
        <Route path="write" element={<WritePage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="my" element={<MyPage />} />
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
}
