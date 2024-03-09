// import React, { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { parseCookies } from 'nookies';

// const withAuth = (WrappedComponent : any) => {
//   return (props : any) => {
//     const Router = useRouter();
//     const { token } = parseCookies();

//     console.log('the rokem in the auth' , token);

//     useEffect(() => {
//       if (!token || token === 'incorrect') {
//         Router.push('/');
//       }
//     }, [token]);

//     return <WrappedComponent {...props} />;
//   };
// };

// export default withAuth;

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
function AuthWrapper({ children }: { children: React.ReactNode }) {
  const backendUrl = process.env.BACKEND_URL || "http://localhost:3000";
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get(`${backendUrl}/user/me`, { withCredentials: true })
          .then((res) => {
            if (res) {
              setIsAuthenticated(true);
            } else {
              router.push("/");
            }
          })
          .catch(() => {
            router.push("/");
          });
      } catch {
        router.push("/");
      }
    };
    fetchData();
  }, []);

  if (isAuthenticated) {
    return <>{children}</>;
  }
  return null;
}

export default AuthWrapper;
