import { NextPage } from 'next';
import { promises as fs } from 'fs';
import Link from '../components/link';
import dynamic from 'next/dynamic';

export async function getStaticProps() {
  const filePath = process.env.NX_FILE_PATH!;

  //const filePath = path.join(process.cwd(), process.env.NODE_ENV);
  const fileContents = JSON.parse(await fs.readFile(filePath, 'utf8'));
  return {
    props: {
      project: fileContents,
    },
  };
}
const Layout = dynamic(() => import('../components/layout'), { ssr: false });
const ProjectShow = dynamic(() => import('../components/projectShow'), {
  ssr: false,
});

const Home: NextPage = ({ project }: any) => {
  return (
    <Layout project={project}>
      <ProjectShow basePath="/" project={project} linkComponent={Link} />
    </Layout>
  );
};

export default Home;
