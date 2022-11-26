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
  eventInfos: css`
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

const DeclaredEvents = ({ events }) => (
  <Grid container spacing={2}>
    {events.length > 0
      ? events.map((event) => (
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Informations" subheader={`évènement créé le: ${formatDate(event.created_at)}`} />
            <CardContent sx={{ minWidth: '724px' }}>
              <div css={styles.eventInfos}>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Description:</Typography>
                  <Typography variant="body2" sx={styles.text}>{event.comment}</Typography>
                </div>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Evènement accessible:</Typography>
                  {event.accessible.onCar && <Typography variant="body2" sx={styles.text}>En voiture</Typography>}
                  {event.accessible.onFoot && <Typography variant="body2" sx={styles.text}>A pied</Typography>}
                </div>
                <div css={styles.section}>
                  <Typography variant="subtitle2" sx={styles.title}>Equipements nécessaires au nettoyage: </Typography>
                  {event.equipments.map((equipment, index) => (
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
            <CardContent sx={{ minWidth: '724px' }}>
              <Typography>
                Vous n&apos;avez organisé aucun évènement
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )}
  </Grid>
);

export default DeclaredEvents;
