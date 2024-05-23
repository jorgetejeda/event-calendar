"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Grid, Icon, Paper, Box, Typography, Container } from "@mui/material";
import theme from "@/theme";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// Slider
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => { 
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            md={8}
            sm={12}
            display="flex"
            flexDirection="column"
            gap={2}
          >
            <Box>
              <Typography variant="h3">Bienvenido, usuario!</Typography>
            </Box>
            <Box>
              <Typography variant="body1">
                Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos.
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item md={7} sm={12}>
                <Paper elevation={0} sx={{ padding: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={2}
                  >
                    <Typography variant="h3">Proximos eventos</Typography>
                    <Link href="/events" style={{ fontSize: "12px" }}>
                      Ver todos
                    </Link>
                  </Box>

                  <Box display="flex" gap={2} flexDirection="column">
                    {[...Array(2)].map((_, index) => (
                      <Box
                        key={index}
                        padding={2}
                        borderRadius={2}
                        display="flex"
                        gap={2}
                        flexDirection="column"
                        sx={{ background: theme.palette.grey[100] }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <Icon
                            className="fas fa-calendar-alt"
                            fontSize="small"
                          />
                          <Typography variant="caption">7/2/2021</Typography>
                        </Box>
                        <Box>
                          <Typography variant="h4">
                            Nombre del evento #{index + 1}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Jorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc vulputate libero et velit interdum, ac
                            aliquet odio mattis.
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Icon
                            className="fas fa-map-marker-alt"
                            fontSize="small"
                          />
                          <Typography variant="caption">
                            36 Paramount Drive, Raynham MA 2767
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
              <Grid item md={5} sm={12}>
                <Paper elevation={0} sx={{ padding: 2 }}>
                  <Typography variant="body1">Horas Acumuladas</Typography>
                  <Typography variant="h1">120</Typography>
                </Paper>

                <Paper elevation={0} sx={{ padding: 2, marginTop: 2 }}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    marginBottom={2}
                  >
                    <Typography variant="h3">Galeria</Typography>
                    <Link href="/events" style={{ fontSize: "12px" }}>
                      Ver todas las imagenes
                    </Link>
                  </Box>
                       <AutoPlaySwipeableViews
                          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: 255,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          {/* Calendar */}
          <Grid item md={4} sm={12}>
            <Paper elevation={0} sx={{ padding: 2 }}>
              <Typography variant="h3">Calendario</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar  />
              </LocalizationProvider>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
