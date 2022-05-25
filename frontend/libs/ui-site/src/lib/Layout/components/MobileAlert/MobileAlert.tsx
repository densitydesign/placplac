import { Project } from '@algocount/shared/types';
import { OutlinedButton } from '../../../components/OutlinedButton';
import { ProjectHero } from '../../../ProjectShow/components/ProjectHero';
import { translations } from '../../../translations';
import styles from './MobileAlert.module.css';
export const MobileAlert = ({
  project,
  onReadMoreClick,
}: {
  project: Project;
  onReadMoreClick: () => void;
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.content}>
        <ProjectHero
          adjustHeightForHeader={false}
          project={project}
          topContent={
            <div className={styles.alert}>
              <span>
                This website powered by PlacPlac is designed for desktop
                experience
              </span>
            </div>
          }
          bottomContent={
            <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              <OutlinedButton onClick={onReadMoreClick}>
                Continue anyway
              </OutlinedButton>
            </div>
          }
        />

        <div
          dangerouslySetInnerHTML={{
            __html: translations[project.language].info_platform,
          }}
          style={{ padding: '20px' }}
        />
        <br />
        <a href="https://creativecommons.org/licenses/by/4.0/">
          <img
            src="https://licensebuttons.net/l/by/3.0/88x31.png"
            alt="cc-by-4.0"
          ></img>
        </a>
      </div>
    </div>
  );
};
