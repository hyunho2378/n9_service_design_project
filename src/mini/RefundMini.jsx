// TODO: N9 AI 추천 결과 화면 목업 — 시술 추천 + AI 이미지 (추후 실제 스크린샷/목업으로 교체)
// PhoneFrame(scale=0.62)에 들어가는 390px 기준 뷰

export default function RefundMini() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FAFAF9',
      gap: '12px',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: '#F2F2F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="8" height="8" rx="2" stroke="#02C75A" strokeWidth="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="2" stroke="#02C75A" strokeWidth="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="2" stroke="#02C75A" strokeWidth="1.5" />
          <path d="M13 17h8M17 13v8" stroke="#02C75A" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <p style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#565656', fontFamily: 'sans-serif' }}>
        AI 추천 결과
      </p>
      <p style={{ margin: 0, fontSize: '11px', color: '#888780', fontFamily: 'sans-serif', textAlign: 'center', padding: '0 24px' }}>
        목업 교체 예정
      </p>
    </div>
  );
}
