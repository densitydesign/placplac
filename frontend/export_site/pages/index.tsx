import type { NextPage } from "next";
import { ProjectShow } from "frontend-components";
import path from "path";
import { promises as fs } from "fs";
import Link from "../components/link";
import dynamic from "next/dynamic";

export async function getStaticProps() {
  const filePath = process.env.FILE_PATH!;

  //const filePath = path.join(process.cwd(), process.env.NODE_ENV);
  const fileContents = JSON.parse(await fs.readFile(filePath, "utf8"));
  return {
    props: {
      project: fileContents,
      experiments: fileContents.experiments,
      glossaryTerms: fileContents.glossary_terms,
      glossaryCategories: fileContents.glossary_categories,
      language: fileContents.language,
    },
  };
}
const Layout = dynamic(() => import("../components/layout"), { ssr: false });

const Home: NextPage = ({
  project,
  glossaryTerms,
  glossaryCategories,
  experiments,
  language,
}: any) => {
  return (
    <Layout language={language} experiments={experiments}>
      <ProjectShow
        glossaryCategories={glossaryCategories}
        glossaryTerms={glossaryTerms}
        basePath="/"
        project={project}
        linkComponent={Link}
      />
    </Layout>
  );
};

export default Home;
