/* eslint-disable react/prop-types */
/** @jsxRuntime classic */
/** @jsx jsx */
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
} from '@mui/material';
import { css, jsx } from '@emotion/react';
import { formatDate } from '../../../utils/utils';

const styles = {
  header: css`
    font-size: 16px;
    font-weight: bold;
    color: #5c5c5c;
  `,
  subheader: css`
  margin-top: 5px;
    font-size: 12px;
    font-style: italic;
    color: #8D8D8D;
  `,
  dumpInfos: css`
    margin-top: 30px;
  `,
  title: css`
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 5px;
    color: #5c5c5c;
  `,
  text: css`
    font-size: 14px;
    margin-bottom: 5px;
    color: #6d6d6d;
  `,
  section: css`
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
};

const CleanedDumps = ({ dumps }) => (
  <Grid container spacing={2}>
    {dumps.length > 0
      ? dumps.map((dump, indexDump) => (
        <Grid item xs="auto" key={`dump-${indexDump + 1}`}>
          <Card sx={{ height: '100%' }}>
            <CardContent sx={{ minWidth: '300px', height: '100%' }}>
              <div css={styles.section}>
                <Typography component="span" sx={styles.header}>Informations de la décharge</Typography>
                <Typography component="span" sx={styles.subheader}>
                  décharge créée le:
                  {' '}
                  {formatDate(dump.created_at)}
                </Typography>
              </div>
              <div css={styles.dumpInfos}>
                <div css={styles.section}>
                  <Typography component="span" variant="subtitle2" sx={styles.title}>Description:</Typography>
                  <Typography component="span" variant="body2" sx={styles.text}>{dump.comment}</Typography>
                </div>
                <div css={styles.section}>
                  <Typography component="span" variant="subtitle2" sx={styles.title}>Décharge accessible:</Typography>
                  {dump.accessible.onCar && <Typography component="span" variant="body2" sx={styles.text}>En voiture</Typography>}
                  {dump.accessible.onFoot && <Typography component="span" variant="body2" sx={styles.text}>A pied</Typography>}
                </div>
                <div css={styles.section}>
                  <Typography component="span" variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
                  {dump.equipments.map((equipment, index) => (
                    <Typography
                      component="span"
                      variant="body2"
                      key={`equipment-${index + 1}`}
                      sx={styles.text}
                    >
                      {equipment.name}
                    </Typography>
                  ))}
                </div>
                <div css={styles.section}>
                  {dump.status === 'closed' && <Alert severity="info" sx={styles.text}>Statut: nettoyée</Alert>}
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))
      : (
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ minWidth: '724px' }}>
              <Typography component="span">
                Vous n&apos;avez nettoyé aucune décharge
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
  </Grid>
);

export default CleanedDumps;
