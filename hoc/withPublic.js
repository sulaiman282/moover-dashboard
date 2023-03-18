
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';


const withPublic = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== 'undefined') {
      const router = useRouter();
      const [cookies] = useCookies(['token','usertype']);

      
      const Token = cookies?.token;
      const UserType = cookies?.usertype;
      console.log(Token,UserType)


      if ( Token && UserType=="admin" ) {
        router.push('/admin/vendors');
        // return null;
      }
      else if ( Token && UserType=="vendor" ) {
        router.push('/vendor/drivers');
        // return null;
      }

      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return <WrappedComponent {...props} />;
  };
};

export default withPublic;
