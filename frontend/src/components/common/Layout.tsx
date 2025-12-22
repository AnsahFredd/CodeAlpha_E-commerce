import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer';
import { ROUTES } from '../../constants';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const hideLayout = [
    ROUTES.LOGIN,
    ROUTES.REGISTER,
    '/login',
    '/register',
    '/signup',
  ].includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
};

export default Layout;
