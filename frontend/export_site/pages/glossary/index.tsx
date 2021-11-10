import type { NextPage } from "next";
import { GlossaryShow, ProjectShow } from "frontend-components";
import path from "path";
import { promises as fs } from "fs";
import Link from "../../components/link";
import dynamic from "next/dynamic";

export async function getStaticProps() {
  const filePath = process.env.FILE_PATH!;

  //const filePath = path.join(process.cwd(), process.env.NODE_ENV);
  const fileContents = JSON.parse(await fs.readFile(filePath, "utf8"));
  return {
    props: {
      experiments: fileContents.experiments,
      glossaryTerms: fileContents.glossary_terms,
      glossaryCategories: fileContents.glossary_categories,
    },
  };
}
const Layout = dynamic(() => import("../../components/layout"), { ssr: false });

const Glossary: NextPage = ({
  glossaryTerms,
  glossaryCategories,
  experiments,
}: any) => {
  return (
    <Layout experiments={experiments}>
      <GlossaryShow
        glossaryCategories={glossaryCategories}
        glossaryTerms={glossaryTerms}
        basePath=""
        linkComponent={Link}
      />
    </Layout>
  );
};

export default Glossary;
