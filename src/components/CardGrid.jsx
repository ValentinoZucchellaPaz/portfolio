import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/joy";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

export function CardGrid({ projects }) {
    return (
        <Grid container spacing={2}>
            {projects.map((p, i) => (
                <Grid xs={12} sm={6} md={4} key={i} sx={{ height: '100%' }}>
                    <motion.div initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        style={{ height: '100%' }}>
                        <Card variant="soft" sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography level="title-lg" textColor={'primary.500'}>{p.title}</Typography>
                                <Typography level="body-sm" mb={1}>{p.description}</Typography>
                                <Typography level="body-xs" textColor="primary.500">
                                    {p.tech.join(' • ')}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                                    {p.link && <Button
                                        variant="outlined"
                                        size="sm"
                                        sx={{ mt: 1, width: '100%' }}
                                        component="a"
                                        href={p.link}
                                        target={!p.detail ? "_blank" : ''}
                                    >
                                        {p.detail ? 'Ver más' : 'Ver Github'}
                                    </Button>}
                                    {p.page && <Button
                                        variant="outlined"
                                        size="sm"
                                        sx={{ mt: 1, width: '100%' }}
                                        component="a"
                                        href={p.page}
                                        target={!p.detail ? "_blank" : ''}
                                    >
                                        Ver Demo
                                    </Button>}
                                </Box>
                            </CardContent>
                        </Card>
                    </motion.div>
                </Grid>
            ))}
        </Grid>
    )
}