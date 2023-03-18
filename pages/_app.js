import "@/styles/globals.css";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "next/router";

export default function App({ Component, pageProps,router }) {
  NProgress.configure({ showSpinner: false });
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer
        autoClose={3500}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
        draggable={true}
        position="top-right"
        toastClassName=""
        bodyClassName=""
        progressClassName=""
        pauseOnFocusLoss={true}
        newestOnTop={true}
        theme="colored"
      />
    </>
  );
}
