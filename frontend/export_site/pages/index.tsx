import { App } from "frontend-components";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ProjectShow } from "frontend-components";
import path from "path";
import { promises as fs } from "fs";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data.json");
  const fileContents = await fs.readFile(filePath, "utf8");
  return {
    props: {
      project: JSON.parse(fileContents),
    },
  };
}

const Home: NextPage = ({ project }: any) => {
  return <ProjectShow basePath="" backend={false} project={project} />;
};

export default Home;
