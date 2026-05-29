// TODO: N9 AI 설문 화면 목업 — 8개 질문 중 한 단계 (추후 실제 스크린샷/목업으로 교체)
// PhoneFrame(scale=0.62)에 들어가는 390px 기준 뷰

export default function ChargeMini() {
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="5" width="18" height="14" rx="2" stroke="#02C75A" strokeWidth="1.5" />
          <path d="M8 10h8M8 14h5" stroke="#02C75A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#0A0A0A', fontFamily: 'sans-serif' }}>
        AI 설문 화면
      </p>
      <p style={{ margin: 0, fontSize: '11px', color: '#0A0A0A', fontFamily: 'sans-serif', textAlign: 'center', padding: '0 24px' }}>
        목업 교체 예정
      </p>
    </div>
  );
}
