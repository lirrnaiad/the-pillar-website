import Header from '../Header';
import Footer from '../Footer';
import FeedbackForm from '../FeedbackForm';
import './Layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        {children}
      </main>
      <FeedbackForm />
      <Footer />
    </div>
  );
}

export default Layout;

