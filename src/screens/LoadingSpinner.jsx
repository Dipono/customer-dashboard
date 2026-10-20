
const LoadingSpinner = ({ text = 'Loading...' }) => (
  <div className="loading-container">
    <div className="spinner"></div>
    <p className="loading-text">{text}</p>
  </div>
);

export default LoadingSpinner;