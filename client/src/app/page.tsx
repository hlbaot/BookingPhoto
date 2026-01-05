import Head from '@/component/Header';
import Home from '@/pages/Home';
import Explore from '@/pages/Explore';
import Service from '@/pages/Service';
import Review from '@/pages/Review';
import Contact from '@/pages/Contact';

export default function Page() {
  return (
    <>
    <Head/>
    <Home/>
    <Explore/>
    <Service/>
    <Review/>
    <Contact/>
    </>
  );
}
