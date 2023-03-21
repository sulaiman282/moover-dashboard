import { useRouter } from "next/router";
import { useCookies } from "react-cookie";




const withAuth = (WrappedComponent) => {
  return (props) => {
    if (typeof window !== "undefined") {
      const router = useRouter();
      const [cookies] = useCookies(["token","usertype"]);
      const [, , removeCookie] = useCookies(["token"]);

      const Token = cookies?.token;
      const UserType = cookies?.usertype;

  //  console.log(Token,UserType)

      if (!Token) {
        router.push("/");
        removeCookie("token", { path: "/" });
        removeCookie("usertype", { path: "/" });
        router.push("/");
        return <WrappedComponent {...props} />;
      } 
       else if (UserType!=="vendor") {
        removeCookie("token", { path: "/" });
        removeCookie("usertype", { path: "/" });
        router.push("/");
        return <WrappedComponent {...props} />;
      } 

    return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
