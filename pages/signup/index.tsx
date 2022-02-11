import Layout from "../../components/PageLayout/Layout";
import SignUpForm from "../../components/Forms/SignUpForm";

export interface SignUpPageProps {}

export default function SignUpPage(props: SignUpPageProps) {
  return (
    <Layout title="Sign Up">
      <SignUpForm />
    </Layout>
  );
}
