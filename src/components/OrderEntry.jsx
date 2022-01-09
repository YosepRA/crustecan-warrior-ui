import React from 'react';
import { Field } from 'formik';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  width: '100%',
  ':not(:last-child)': { marginBottom: theme.spacing(2) },
}));

const OrderEntry = function OrderEntryComponent({
  seats,
  order,
  index,
  remove,
}) {
  const sectionOptions = seats.reduce((acc, cur) => {
    if (!acc.some((section) => section === cur.section)) {
      return acc.concat(cur.section);
    }

    return acc;
  }, []);
  const seatNumberOptions = seats
    .filter((seat) => seat.section === order.section)
    .map((seat) => seat.seatNumber);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Seat Order {index + 1}
        </Typography>

        <Box component="section">
          <Field name={`orders.${index}.section`}>
            {({ field, form: { setFieldValue } }) => (
              <StyledAutocomplete
                {...field}
                onChange={(event, newInputValue) => {
                  setFieldValue(field.name, newInputValue);
                }}
                options={sectionOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Section" />
                )}
              />
            )}
          </Field>

          <Field name={`orders.${index}.seatNumber`}>
            {({ field, form: { setFieldValue } }) => (
              <StyledAutocomplete
                {...field}
                onChange={(event, newInputValue) => {
                  setFieldValue(field.name, newInputValue);
                }}
                options={seatNumberOptions}
                renderInput={(params) => (
                  <TextField {...params} label="Seat Number" />
                )}
              />
            )}
          </Field>
        </Box>
      </CardContent>

      <CardActions>
        <Button color="error" onClick={() => remove(index)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrderEntry;
