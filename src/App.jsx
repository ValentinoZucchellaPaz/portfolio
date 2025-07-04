// Portfolio profesional en React + Vite + MUI Joy (estilo minimalista techie)
// Estructura completa con soporte para toggle de tema y organización por carpetas

// src/App.tsx
import { Box, Typography, Sheet, Button, Grid, Card, CardContent, Avatar, IconButton, Divider } from '@mui/joy';
import TechGrid from './components/TechGrid';
import { motion } from 'framer-motion';
import { useColorScheme } from '@mui/joy';
import { projects } from './static/projects';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

export function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  return (
    <IconButton
      variant="soft"
      onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
      sx={{ position: 'absolute', top: 16, right: 16 }}
    >
      {mode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
    </IconButton>
  );
}

export default function App() {
  return (
    <Sheet sx={{ minHeight: '100vh', px: 4, py: 6, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ThemeToggle />

      <Box component={motion.header} mb={4} textAlign="center" initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Typography level="h2" fontWeight="xl" mb={1} textColor={'primary.500'}>
          Valentino | Desarrollador Fullstack
        </Typography>
        <Typography level="body-md" maxWidth={700} mx="auto">
          Fullstack (React y .NET/Node). Apasionado por la tecnología, la programación y el Karate.
        </Typography>



        <img
          src="https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif"
          alt="Matrix effect"
          style={{ marginTop: '1rem', width: '100%', maxWidth: 400, borderRadius: '12px' }}
        />
      </Box>

      <Box mb={6}>
        <Typography level="h3" mb={1} textColor={'primary.500'}>Sobre mí</Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src="https://avatars.githubusercontent.com/u/106201105?v=4" size="lg" sx={{ minWidth: '100px', minHeight: '100px' }} />
          <Typography maxWidth={500}>
            Estudiante de Ingeniería en Computación.
            Experiencia en desarrollo web, diseño de APIs RESTful y proyectos electrónicos. Main stack React y .NET, actualmente aprendiendo Node.
            Me apasiona aprender de forma autodidacta y aplicarlo en proyectos personales.
          </Typography>
        </Box>
      </Box>

      <Typography level="h3" mb={2} textColor={'primary.500'}>Proyectos Destacados</Typography>
      <Grid container spacing={2} sx={{
        px: {
          xs: 4,   // padding 4 en pantallas chicas
          sm: 6,   // a partir de 600px
          md: 8,   // a partir de 900px
          lg: 14,  // a partir de 1200px
        },
      }}>
        {projects.map((p, i) => (
          <Grid xs={12} sm={6} md={4} key={i} sx={{ height: '100%' }}>
            <motion.div initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              style={{ height: '100%' }}>
              <Card variant="soft" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography level="title-md" textColor={'primary.500'}>{p.title}</Typography>
                  <Typography level="body-sm" mb={1}>{p.description}</Typography>
                  <Typography level="body-xs" textColor="primary.500">
                    {p.tech.join(' • ')}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="sm"
                    sx={{ mt: 1 }}
                    component="a"
                    href={p.link}
                    target={!p.detail ? "_blank" : ''}
                  >
                    {p.detail ? 'Ver más' : 'Ver Github'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>



      <Box mt={6}>
        <Typography level="h3" mb={1} textColor={'primary.500'}>Tecnologías favoritas</Typography>
        <Typography level="body-sm" maxWidth={600}>
          Me encanta trabajar con herramientas modernas y eficientes como React, TypeScript, .NET, Node.js, Tailwind, y más. También me intereso por Machine Learning en imagenes.
        </Typography>
      </Box>

      <TechGrid />

      <Divider sx={{ my: 4 }} />

      <Box>
        <Typography level="h3" mb={1} textColor={'primary.500'}>Contacto</Typography>
        <Typography>
          <a href="mailto:vzucchellapaz@gmail.com">vzucchellapaz@gmail.com</a> •
          <a href="https://github.com/ValentinoZucchellaPaz" target="_blank" rel="noopener noreferrer"> GitHub</a> •
          <a href="https://www.linkedin.com/in/valentino-zucchella-paz-7230b0243/" target="_blank" rel="noopener noreferrer"> LinkedIn</a>
        </Typography>
      </Box>
    </Sheet>
  );
}