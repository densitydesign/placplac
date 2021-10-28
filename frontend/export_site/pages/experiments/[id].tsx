import { App } from "frontend-components";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ExperimentShow } from "frontend-components";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: "1" } }, // See the "paths" section below
    ],
    fallback: false, // See the "fallback" section below
  };
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      experiment: {
        id: 2,
        title: "Why I am seeing this infodemic on my Facebook's News feed?",
        description:
          "<p>The project focuses on:</p><ul><li>exploring the day by day development of a newborn facebook ✨News Feed interested in no mask related issues in Italy;</li><li>collecting data about ✨News Feed and use activity;</li><li>visualize and tell the radicalization process following platform affordance: #</li></ul>",
        context: [
          [
            {
              type: "text",
              content: {
                text: '<p>✨News Feed is the centerpiece of your Facebook’s Home page. It’s a constantly updating list of stories by and about your friends. Stories here refers to actions that your friends have taken on Facebook — things like writing a status update, sharing a photo or link, or becoming friends. You may also see stories from Pages that you follow. More accurately, ✨News Feed&nbsp;is an algorithm. It doesn’t show you everything from your friends; instead, it tries to show you things it thinks you will find interesting. It makes its selections based on a complicated calculus of who is posting what and when.&nbsp;&nbsp;✨News Feed will likely show you more stories from people you interact with more often on Facebook. It also has a tendency to show you “big events” like engagements or new babies even from more distant acquaintances. News Feed also learns the sorts of stories you are likely to click on, like, or comment on, and will try to show you more of those. Simply browsing ✨News Feed and interacting with the things you see helps ✨News Feed o improve. There are ways for you to manually fine-tune ✨News Feed as well.</p><p>From GDPR &gt; new approach to transparency. Facebook includes the "Why I\'m seeing this" feature as some others (download of personal data and data about advertisment). With this, Facebook recognizes the existence of algorithms that manage content but, are they really accounting on how they work? Can I really understand why I am seeing this in my ✨News Feed?</p><p>The "Why I am seeing this" mobile app and desktop feature (they appear differently in both), [qui descrizione "se tu vedi una pubblicità..."]</p>',
              },
            },
          ],
        ],
        research_question:
          'How does Facebook\'s algorithm facilitate the radicalization of a newborn user through suggestions started by "no mask Italia"?',
        experiment_setup: [
          [
            {
              type: "listExperimentSetup",
              content: {
                list: [
                  "You will use Facebook always from the same computer. ",
                  "Navigate in a clean browser (we use Brave) in Incognito mode.",
                ],
                image: 1,
                title: "INFRastracture",
                isWide: false,
                caption: "un'immagine bella",
                subtitle: "{How to setup your device and browser}",
              },
            },
            {
              type: "listExperimentSetup",
              content: {
                list: ["No Off Activity"],
                title: "PLATFORM",
                subtitle: "How to setup the platform in use",
              },
            },
            {
              type: "listExperimentSetup",
              content: {
                list: [
                  "The generated newborn profile activity doesn’t include posting, sharing, commenting, liking and chatting ctions",
                ],
                title: "BEHAVIOUR",
                subtitle:
                  "How to setup your actions on the platform before starting",
              },
            },
          ],
        ],
        disclaimers: ["asdasdasdasd"],
        findings: [
          [
            {
              type: "text",
              content: {
                text: "<p>Through an experiment carried out under super-controlled conditions, the hypothesis that Facebook's algorithm quickly brings you closer to strongly radicalized groups and pages is confirmed. Using stories to showcase how the platform brings users closer to radicalization turned out to be a good way to highlight different sides of the same radicalization process.</p><p><br></p><p>From the trigger Why I’m seeing this ad/post it was not possible to truly understand the reasons why I was seeing this: the information provided by Facebook seemed depthless. On the other hand, following the effects of actions and decisions it is possible to connect the motivations of why I am effectively seeing this.</p><p>From “Why I see this ad/post” to “Where certain actions/choices will take me”.&nbsp;</p>",
              },
            },
          ],
        ],
        project: 1,
        steps: [
          {
            id: 2,
            title: "SEARCH “NO MASK ITALIA” ON FACEBOOK",
            description:
              "<p>On Facebook,&nbsp;we search:&nbsp;</p><ul><li>In Public Groups and join into the first 6 of them.</li><li>In Pages and follow the first 7 of them.</li><li>By Friends and add the first 8 of them.</li></ul><p><br></p>",
            content: [
              [
                {
                  type: "text",
                  content: {
                    text: "<p>The idea is to animate and contaminate Anastasio’s profile with some infodemic searches. We choose “No Mask Italia” as our infodemic topic. This is the input for exploring what output will be provided by Facebook’s algorithms into our ✨News Feed.\u2028Take record of all these inputs on a spreadsheet, following the Facebook links for each Groups, Pages and Friends you will join, follow and add. Move to the following step after waiting 2 days.</p>",
                  },
                },
              ],
              [
                {
                  type: "image",
                  content: {
                    image: 1,
                    isWide: false,
                    caption:
                      "MEDIABOX #3 — Gif image of Anastasio’s account showing the Facebook’s interface where to performe the search of Public Groups to join, the Pages to follow and the Friends to be added.",
                  },
                },
              ],
            ],
            step_number: 2,
            experiment: 2,
          },
          {
            id: 1,
            title: "ACCOUNT IDENTITY CREATION",
            description:
              '<p>First, we must create a newborn identity account on Facebook. For randomly creating the name, we use&nbsp;<span class="mention" data-index="1" data-denotation-char="" data-id="4" data-value="<a href=&quot;#glossary/4&quot; target=_self><span style=&quot;background-color:#000000&quot;>Fakenamegenerator.com</span>" data-link="#glossary/4" data-target="_self">﻿<span contenteditable="false"><span class="ql-mention-denotation-char"></span><a href="#glossary/4" target="_self"><span style="background-color:#000000">Fakenamegenerator.com</span></a></span>﻿</span> </p>',
            content: [
              [
                {
                  type: "image",
                  content: {
                    image: 2,
                    isWide: false,
                    caption:
                      "FIG 1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida mi semper sed turpis in tristique.",
                    description:
                      "Fake Name Generator — Create an identity with random gender, name and age. Since our experiment is setup in the Italian context, we specified that the name should correspond from an Italian set of names. ",
                  },
                },
                {
                  type: "image",
                  content: {
                    image: 1,
                    isWide: false,
                    caption:
                      "FIG 2 — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Gravida mi semper sed turpis in tristique.",
                    description:
                      "Facebook — We set Milano as location. When you create a Facebook account it is required to set three seeds of interests from a list of suggestions. We picked randomly: memes, travelling, listen to music.\n",
                  },
                },
              ],
            ],
            step_number: 1,
            experiment: 2,
          },
          {
            id: 5,
            title: "RECORD YOUR\u2028✨NEWS FEED AND ACTIONS",
            description: null,
            content: [
              [
                {
                  type: "text",
                  content: {
                    text: "<p>In this step we recorded our Facebook’s screen as a video and the content in it into a&nbsp;spreadsheet. Because we want to see the effect of the contamination of Anastasio’s account, we record what was appearing in his ✨News Feed. We also record the continuous contamination process of liking suggested pages.\u2028Screen recrding is&nbsp;&nbsp;a technique that allows to record the News Feed changes per day for then analizing and comparing the algorithmic contamination after several days.</p>",
                  },
                },
              ],
              [
                {
                  type: "image",
                  content: {
                    image: 1,
                    isWide: false,
                    caption:
                      "MEDIABOX #4 — Screen recording of the screen recording while we explore the newsfeed. You can see the face of the researcher with voice comments over.",
                    description:
                      "Record your ✨News Feed screen — We recorded using                       since we wanted to record our own face commenting what we where seeing. Keep scrolling until see your whole ✨News Feed content.\nRecording the ✨News Feed provide a way of contextualizing the changes we will see in the folllowing days.\n",
                  },
                },
              ],
              [
                {
                  type: "image",
                  content: {
                    image: 1,
                    isWide: false,
                    caption:
                      "MEDIABOX #5 — Detail of Facebook’s interface where suggested pages appears.",
                    description:
                      "Continue recording your screen while you “like pages” — Like the 10 suggested pages that appear in your ✨News Feed. \n",
                  },
                },
              ],
              [
                {
                  type: "image",
                  content: {
                    image: 1,
                    isWide: false,
                    caption:
                      "MEDIABOX #6 — Detail of Facebook’s interface where to download your data.",
                    description:
                      'Collect and record the suggested liked pages in a                                      . Recording the liked pages will help us to follow how the “contamination” input is affecting our ✨News Feed content (the output).\u2028This is what the                                                               is about.\u2028Facebook has a section where you can monitor and download information about your account activity such as likes, follows, comments and so on.\nFollow these steps: Go to >"Settings"  > "Your Facebook information" > "Download your information"\nIn the "Request copy" tab you can set the time range and the format of the file with your activity data. We chose JSON format. Click on "create file" and then in the "Available copies" tab you will find your activity data file that you can download.',
                  },
                },
              ],
            ],
            step_number: 3,
            experiment: 2,
          },
        ],
        cover: "/media/Schermata_del_2021-08-02_09-56-38.png",
      },
    },
  };
}

const Experiment: NextPage = ({ experiment }: any) => {
  return (
    <ExperimentShow basePath="" glossaryTerms={[]} experiment={experiment} />
  );
};

export default Experiment;
