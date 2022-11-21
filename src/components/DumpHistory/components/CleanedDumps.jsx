/* eslint-disable react/prop-types */
/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import { css, jsx } from '@emotion/react';
import { formatDate } from '../../../utils/utils';

const styles = {
  dumpInfos: css`
   margin-top: 30px;
  `,
  title: css`
  font-size: 18px;
    margin-bottom: 10px;
    color: #5c5c5c;
  `,
  text: css`
  font-size: 16px;
    margin-bottom: 5px;
    margin-left: 5px;
    color: #6d6d6d;
  `,
  section: css`
    margin-bottom: 30px;
  `,
};

const CleanedDumps = ({ dumps }) => (
  <Grid container spacing={2}>
    {dumps.length > 0
      ? dumps.map((dump) => (
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Informations" subheader={`décharge créée le: ${formatDate(dump.created_at)}`} />
            <CardContent>
              <div css={styles.dumpInfos}>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Description:</Typography>
                  <Typography variant="body2" sx={styles.text}>{dump.comment}</Typography>
                </div>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Décharge accessible:</Typography>
                  {dump.accessible.onCar && <Typography variant="body2" sx={styles.text}>En voiture</Typography>}
                  {dump.accessible.onFoot && <Typography variant="body2" sx={styles.text}>A pied</Typography>}
                </div>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
                  {dump.equipments.map((equipment, index) => (
                    <Typography
                      variant="body2"
                      key={`equipment-${index + 1}`}
                      sx={styles.text}
                    >
                      {equipment.name}
                    </Typography>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))
      : (
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                sx={{ minWidth: '724px' }}
              >
                Vous n&apos;avez nettoyé aucune décharge
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
  </Grid>
);

export default CleanedDumps;
