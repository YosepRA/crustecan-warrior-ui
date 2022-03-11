import React from 'react';
import { format } from 'date-fns';
import { jsPDF as JsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

function createBarcode(id) {
  const canvas = document.createElement('canvas');

  JsBarcode(canvas, id);

  return canvas.toDataURL();
}

const TicketCard = function TicketCardComponent({ ticket }) {
  const {
    seat,
    fixture: { date, homeTeam, awayTeam, event },
  } = ticket;
  const dateString = format(new Date(date), 'MM/dd/yyyy');

  const handleDownload = ({
    _id: ticketIdDownload,
    fixture: {
      date: dateDownload,
      homeTeam: homeTeamDownload,
      awayTeam: awayTeamDownload,
    },
  }) => {
    const doc = new JsPDF({ format: [50, 143], orientation: 'landscape' });
    const fileDateString = format(new Date(dateDownload), 'yyyy-MM-dd');
    const fileName =
      `${fileDateString}-${homeTeamDownload}-vs-${awayTeamDownload}-ticket`
        .toLowerCase()
        .replaceAll(' ', '-');
    const barcode = createBarcode(ticketIdDownload);

    doc.setFontSize(9);
    doc.text('Hey there!', 10, 10);
    doc.text(`This is the ticket ID: ${ticketIdDownload}`, 10, 15);
    doc.text(`${homeTeamDownload} vs ${awayTeamDownload}`, 10, 20);
    doc.addImage(barcode, 'PNG', 10, 25, 50, 15);
    doc.save(fileName);
  };

  return (
    <Paper
      component="article"
      className="ticket"
      sx={{ p: 2, ':not(:last-child)': { mb: 1 } }}
    >
      <Box className="ticket__fixture" sx={{ mb: 3 }}>
        <Typography className="ticket__event" sx={{ mb: 1 }}>
          {event}
        </Typography>

        <Typography className="ticket__date" sx={{ mb: 1 }}>
          {dateString}
        </Typography>

        <Box className="ticket__main-info" sx={{ py: 2, textAlign: 'center' }}>
          <Typography
            className="ticket__teams"
            sx={{ mb: 1, fontSize: '1.1rem' }}
          >
            {homeTeam} vs {awayTeam}
          </Typography>

          <Typography className="ticket__seat" sx={{ color: 'text.secondary' }}>
            Seat: {`${seat.section}-${seat.seatNumber}`}
          </Typography>
        </Box>
      </Box>

      <Box className="ticket__action">
        <Button
          className="ticket__download"
          aria-label="download"
          variant="outlined"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={() => handleDownload(ticket)}
        >
          Download PDF
        </Button>
      </Box>
    </Paper>
  );
};

export default TicketCard;
