import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('App Error:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center',
          justifyContent:'center', minHeight:'100vh', padding:'2rem', textAlign:'center', background: 'var(--surface-bg)' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😵</div>
          <h2 style={{ fontFamily:'Syne, sans-serif', fontSize:'22px', marginBottom:'8px', color: 'var(--text-primary)' }}>
            Something went wrong
          </h2>
          <p style={{ color:'#6B7280', marginBottom:'24px' }}>
            The app hit an unexpected error. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{ background:'#25D366', color:'#fff', border:'none',
              padding:'12px 32px', borderRadius:'9999px', fontSize:'16px', cursor:'pointer' }}>
            Refresh App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
