// TODO: N9 AI 맞춤 진단 — 메인 진입 화면 목업 (추후 실제 스크린샷/목업으로 교체)
// PhoneFrame(scale=0.62)에 들어가는 390px 기준 뷰

export default function HomeCoachMini() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      gap: '12px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: '#FFFFFF',
        border: '1px solid #0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" stroke="#02C75A" strokeWidth="1.5" />
          <path d="M9 12l2 2 4-4" stroke="#02C75A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'sans-serif' }}>
        AI 진단 메인
      </p>
      <p style={{ margin: 0, fontSize: '11px', color: '#0A0A0A', fontFamily: 'sans-serif', textAlign: 'center', padding: '0 24px' }}>
        목업 교체 예정
      </p>
    </div>
  );
}
