import Layout from "../../components/PageLayout/Layout";
import SignUpForm from "../../components/SignUpForm";

export interface SignUpPageProps {}

export default function SignUpPage(props: SignUpPageProps) {
  return (
    <Layout title="Sign Up">
      <SignUpForm />
    </Layout>
  );
}
