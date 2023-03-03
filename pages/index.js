import { Link } from '@mui/material';

export default function Home() {
  return (
    <>
      <div>Beautiful Cover Page</div>
      <Link href="/login">Login</Link>
      <Link href="/signup">SignUp</Link>
    </>
  );
}

Home.getLayout = (page) => {
  return <>{page}</>;
};
