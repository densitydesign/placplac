import { BuilderShowBlocks } from '@algocount/shared/types';
import { SRLWrapper } from 'simple-react-lightbox';
import { Disclaimer } from './Disclaimer';
import { ExperimentSetupListShow } from './ExperimentSetupListShow';
import { IFrame } from './IFrame';
import { ImageShow } from './ImageShow';
import { ImageShowStep } from './ImageShowStep';
import { SigmaShow } from './SigmaShow';
import { TextShow } from './TextShow';
import { VideoPlayer } from './VideoPlayer';

export const SHOW_COMPONENTS_BUILDER: BuilderShowBlocks = {
  image: {
    description: 'Image',

    render: (content: any) => (
      <SRLWrapper
        options={{
          thumbnails: { showThumbnails: false },
          buttons: {
            showNextButton: false,
            showPrevButton: false,
            showAutoplayButton: false,
            showFullscreenButton: false,
            showDownloadButton: false,
          },
        }}
      >
        <ImageShow
          description={content.description}
          image={content.image}
          caption={content.caption}
          title={content.title}
          subtitle={content.subtitle}
          isWide={content.isWide}
        />
      </SRLWrapper>
    ),
  },
  image_step: {
    description: 'Image',

    render: (content: any) => (
      <SRLWrapper
        options={{
          thumbnails: { showThumbnails: false },
          buttons: {
            showNextButton: false,
            showPrevButton: false,
            showAutoplayButton: false,
            showFullscreenButton: false,
            showDownloadButton: false,
          },
        }}
      >
        <ImageShowStep
          description={content.description}
          image={content.image}
          caption={content.caption}
          title={content.title}
          subtitle={content.subtitle}
          isWide={content.isWide}
        />
      </SRLWrapper>
    ),
  },
  video: {
    description: 'Video player',
    render: (content: any) => (
      <VideoPlayer
        src={content.src}
        autoplay={content.autoplay}
        height={content.height}
        muted={content.muted}
      />
    ),
  },
  text: {
    description: 'Text editor',

    render: (content: any) => <TextShow text={content.text} />,
  },
  disclaimer: {
    description: 'Disclaimer',
    render: (content: any) => (
      <Disclaimer
        description={content.description}
        disclaimerType={content.type}
      />
    ),
  },
  listExperimentSetup: {
    description: 'Experiment setup card',
    render: (content: any) => (
      <ExperimentSetupListShow
        title={content.title}
        subtitle={content.subtitle}
        list={content.list}
      />
    ),
  },
  iframe: {
    description: 'Embed block',
    render: (content: any) => (
      <IFrame src={content.src} height={content.height} />
    ),
  },
  sigma: {
    description: 'Sigma gexf file',
    render: (content: any) => (
      <SigmaShow height={content.height} gexfPath={content.gexfFile} />
    ),
  },
};
