import { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/env';
import { supabase } from '../../lib/supabase';
import styles from './ConnectionCheck.module.css';

type CheckState =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'ok'; count: number }
  | { kind: 'error'; message: string };

// 개발용: Supabase 서버와 연결되는지 버튼으로 확인합니다.
// 버튼을 누를 때만 서버에 요청하므로 불필요한 호출이 생기지 않습니다.
// 로그인 기능이 완성되면 이 화면은 제거합니다.
export default function ConnectionCheck() {
  const [state, setState] = useState<CheckState>({ kind: 'idle' });

  async function runCheck() {
    if (!supabase) return;
    setState({ kind: 'loading' });
    try {
      const { count, error } = await supabase
        .from('categories')
        .select('id', { count: 'exact', head: true });
      if (error) {
        setState({ kind: 'error', message: error.message });
      } else {
        setState({ kind: 'ok', count: count ?? 0 });
      }
    } catch (e) {
      setState({
        kind: 'error',
        message: e instanceof Error ? e.message : '알 수 없는 오류',
      });
    }
  }

  return (
    <section className={styles.box} aria-label="서버 연결 확인">
      <h2 className={styles.title}>서버 연결 확인 (개발용)</h2>

      {!isSupabaseConfigured ? (
        <p className={styles.text}>
          아직 Supabase 연결 정보가 입력되지 않았어요.
        </p>
      ) : (
        <>
          <button
            type="button"
            className={styles.button}
            onClick={runCheck}
            disabled={state.kind === 'loading'}
          >
            {state.kind === 'loading' ? '확인 중…' : '연결 테스트'}
          </button>
          {state.kind === 'ok' && (
            <p className={styles.ok}>
              연결 성공! 카테고리 {state.count}개를 읽었어요. (정상: 8개)
            </p>
          )}
          {state.kind === 'error' && (
            <p className={styles.error}>
              연결에 실패했어요. 아래 문구를 개발 담당(Claude)에게 알려 주세요.
              <br />
              {state.message}
            </p>
          )}
        </>
      )}
    </section>
  );
}
