import Head from "next/head";
import Header from "../ui/dashboard/header";
import Footer from "../ui/dashboard/footer";
import Breadcrumbs from "../ui/dashboard/breadcrumbs";
import Profile from "../ui/dashboard/profile";
import Sidenav from "../ui/dashboard/sidenav";
import MoreServices from "../ui/dashboard/more-services";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="min-h-screen relative">
        <header>
          <Header />
          <div className="w-full min-h-[10rem] bg-teal flex  justify-center">
            <Breadcrumbs />
          </div>
        </header>
        <main>
          <div className="flex justify-center ">
            <div
              className="bg-white container rounded-lg  p-4 overflow-y-auto shadow-slate-100  shadow-md translate-y-[-7.5rem]  pb-[12rem] min-h-[90vh]
              overflow-auto
            "
            >
              <div className="flex h-full min-w-[1400px]">
                {/* LEFT */}
                <div className="basis-3/12 flex flex-col px-2 gap-5">
                  <Profile />
                  <Sidenav />
                  <div className="flex-grow">
                    <MoreServices />
                  </div>
                </div>
                {/* RIGHT */}
                <div className="basis-9/12 px-2">{children}</div>
              </div>
            </div>
          </div>
        </main>
        <footer className="min-h-[9rem] w-screen bg-aqua pt-[6rem] absolute -bottom-4 -z-10">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Layout;
