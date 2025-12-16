import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Chip, Divider, Sheet, IconButton, ModalDialog, Modal, ModalClose } from '@mui/joy';
import { motion } from 'framer-motion';
import { projects } from '../static/projects';
import { ThemeToggle } from '../App';
import { MdArrowBack } from 'react-icons/md';
import { useState } from 'react';


export default function ProjectDetail() {
    const { id } = useParams();
    const navigate = useNavigate()
    const project = projects.find(proj => proj.id.toString() == id && proj.detail);

    const [open, setOpen] = useState(false);
    const [selectedImg, setSelectedImg] = useState(null);

    if (!project) return <Typography>Proyecto no encontrado.</Typography>;

    return (
        <>
            <Sheet sx={{ minHeight: '100vh', px: 4, py: 6, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <ThemeToggle />

                <IconButton
                    variant="soft"
                    onClick={() => navigate('/')}
                    sx={{ position: 'absolute', top: 16, left: 16 }}
                >
                    <MdArrowBack />
                </IconButton>
                <Typography level="h2" textColor="primary.500" mb={2}>{project.title}</Typography>
                <Typography level='h4' mb={3}>{project.description}</Typography>
                <Typography mb={3} maxWidth={800}>{project.longDescription}</Typography>

                <Typography level="title-sm" color="neutral" mb={1}>Tecnologías utilizadas:</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                    {project.tech.map((t, i) => (
                        <Chip key={i} variant="soft" color="success">{t}</Chip>
                    ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography level="title-sm" color="neutral" mb={2}>Galería:</Typography>
                <Box display="flex" flexWrap="wrap" flexDirection='column' gap={3}>
                    {project.media.map((src, i) => (
                        src.includes('mp4') ? (
                            <Box key={i} component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.2 }}>
                                <video
                                    src={src}
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    width={360}
                                    style={{ borderRadius: 8 }}
                                />
                            </Box>
                        ) : (
                            <Box
                                key={i}
                                component={motion.img}
                                src={src}
                                alt={`media-${i}`}
                                width={320}
                                style={{ borderRadius: 8, cursor: 'pointer' }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                onClick={() => {
                                    setSelectedImg(src);
                                    setOpen(true);
                                }}
                            />
                        )
                    ))}
                </Box>
            </Sheet>
            {selectedImg && <Modal open={open} onClose={() => setOpen(false)} >
                <ModalDialog display="flex" justifyContent="center">
                    <ModalClose />
                    <img
                        src={selectedImg || ''}
                        alt="ampliada"
                        style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px', objectFit: 'contain', filter: 'none' }}
                    />
                </ModalDialog>
            </Modal>}
        </>
    );
}
