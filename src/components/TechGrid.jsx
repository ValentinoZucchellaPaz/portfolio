// src/components/TechGrid.tsx
import { Box, Typography } from '@mui/joy';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import reactsvg from '../assets/react.svg'

const technologies = [
    { name: 'TypeScript', icon: 'https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg' },
    { name: 'React', icon: reactsvg },
    { name: 'Tailwind', icon: 'https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg' },
    { name: 'Node.js', icon: 'https://www.vectorlogo.zone/logos/nodejs/nodejs-ar21.svg' },
    { name: '.NET', icon: 'https://www.vectorlogo.zone/logos/dotnet/dotnet-ar21.svg' },
    { name: 'MySQL', icon: 'https://www.vectorlogo.zone/logos/mysql/mysql-ar21~bgwhite.svg' },
];

export default function TechGrid() {
    return (
        <Box mt={6}>
            <Typography level="h3" mb={2} textColor={'primary.500'}>
                Stack Visual
            </Typography>
            <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
                {technologies.map((tech, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        <Box
                            component="img"
                            src={tech.icon}
                            alt={tech.name}
                            sx={{ width: 64, height: 64, objectFit: 'contain' }}
                        />
                    </motion.div>
                ))}
            </Box>
        </Box>
    );
}