import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/PageLayout/Layout";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (user) {
    console.log(user);
  } else {
    return (
      <Layout>
        <Link href="/api/auth/login">
          <a>Login</a>
        </Link>
      </Layout>
    );
  }
  return (
    user && (
      <div>
        {user.picture && user.name && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.picture} alt={user.name} />
        )}
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
