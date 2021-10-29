import type { NextPage } from "next";
import { ProjectShow } from "frontend-components";
import path from "path";
import { promises as fs } from "fs";
import Link from "../components/link";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), process.env.NODE_ENV);
  const fileContents = JSON.parse(await fs.readFile(filePath, "utf8"));
  return {
    props: {
      project: fileContents,
      glossaryTerms: fileContents.glossary_terms,
    },
  };
}

const Home: NextPage = ({ project, glossaryTerms }: any) => {
  return (
    <ProjectShow
      glossaryTerms={glossaryTerms}
      basePath=""
      backend={false}
      project={project}
      linkComponent={Link}
    />
  );
};

export default Home;
