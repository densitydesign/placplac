import { Grid, Box, Radio, FormControlLabel } from '@mui/material';
import { useListContext } from 'react-admin';
import LinesEllipsis from 'react-lines-ellipsis';
import fileIcon from './file.png';

interface MediaDatagridProps {
  onChange: (value: string) => void;
  value: string;
  type: 'image' | 'file';
}

export const MediaDatagrid = (props: MediaDatagridProps) => {
  const { onChange, value, type } = props;
  const { data } = useListContext();

  return (
    <Grid container columnGap={2}>
      {data &&
        data.map((record) => {
          const id = record.id;
          return (
            <Grid item key={id} style={{ width: '200px' }}>
              <Grid
                item
                xs={12}
                container
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <Box
                    width="200px"
                    height="200px"
                    display="block"
                    position="relative"
                    overflow="hidden"
                    boxShadow="2"
                    borderRadius={5}
                  >
                    <Box
                      zIndex={1}
                      width="200px"
                      height="200px"
                      style={{
                        backgroundImage: `url(${
                          type === 'image' ? record.file : fileIcon
                        })`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'none',
                      }}
                      position="absolute"
                    ></Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  style={{
                    width: '200px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{record.name}</span>
                </Grid>
                <Grid item>
                  <Radio
                    id={`img_${id}`}
                    color="primary"
                    style={{ backgroundColor: 'white' }}
                    onChange={(_, isActive) =>
                      isActive && onChange(record.file)
                    }
                    checked={record.file === value}
                  />
                </Grid>
              </Grid>
            </Grid>
          );
        })}
    </Grid>
  );
};
