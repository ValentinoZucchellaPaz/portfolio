import oximeto_vid from '../assets/oximetro_video.mp4'
import oximetro_circuito from '../assets/circuito_oximetro.png'
import alarma_circuito from '../assets/alarma_circuito.png'
import alarma_estados from '../assets/alarma_diagrama_estados.png'
import alarma_foto from '../assets/alarma_foto.jpeg'
import adc_vid from '../assets/video_adc.mp4'
import adc_vid2 from '../assets/video_adc2.mp4'


export const projects = [
    {
        id: 1,
        title: 'Gestor de Torneos de Cartas - 💻',
        description: 'App fullstack con autenticación y backend en .NET.',
        tech: ['React', 'Redux', '.NET', 'MySQL'],
        link: 'https://github.com/ValentinoZucchellaPaz/CursoFrontExtrados',
    },
    {
        id: 2,
        title: 'Conversión AD/DA y almacenamiento - ⚙️',
        description: 'Proyecto electrónico sobre conversion y guardado de una señal.',
        tech: ['RAM', 'ADC', 'DAC', 'Protoboard'],
        link: '/project/2',
        detail: true,
        longDescription: "Este fue un Trabajo Practico para la materia de Electronica Digital 1 de la UNC, en este se realizó la conversión analógico digital de una señal usando un ADC de sucesiones aproximadas de 8 bits, además se almacena información en una RAM 32kx8 durante 5 segundos, también tiene conectado un DAC R2R el cual transforma la señal digital en analógica nuevamente.",
        media: [adc_vid, adc_vid2]
    },
    {
        id: 3,
        title: 'Alarma digital - ⚙️',
        description: 'Alarma digital hecha como autómata de Moore',
        tech: ['FF JK', 'Compuertas Lógicas', 'Protoboard'],
        link: '/project/3',
        detail: true,
        longDescription: "Este fue un Trabajo Practico para la materia de Electronica Digital 1 de la UNC, en este trabajo hicimos una alarma la cual tiene un estado inicial de reposo, se debe poner un codigo para activarla y si detecta movimiento (en nuestro caso simulado con un bit de control) se enciende 2 segundos si y 2 segundos no, hasta que se ponga el codigo de desactivación. Todo esto se logró con el diseño de un autómata de Moore y circuitos combinacionales.",
        media: [alarma_circuito, alarma_estados, alarma_foto]
    },
    {
        id: 4,
        title: 'Oxímetro analógico  - ⚙️',
        description: 'Proyecto electrónico de creación de oxímetro para ver el pulso en el dedo de la mano',
        tech: ['OPAMP', 'Fototransistores', 'Filtros analógicos'],
        link: '/project/4',
        detail: true,
        longDescription: "Este fue un Trabajo Practico para la materia de Electronica de la UNC, en este proyecto implementamos leds y sensores infrarojos para detectar el pulso en el dedo de una persona, la luz se refleja en la sangre del dedo de la persona, se detecta esta reflexión y se genera una señal la cual se amplifica y filtra con OPAMP's y distintos filtros pasa bajo/alto, para a la salida ver como se enciende un led siguiendo el ritmo cardíaco.",
        media: [oximeto_vid, oximetro_circuito]
    },
    {
        id: 5,
        title: 'Agenda de tareas semanales  - 💻',
        description: 'CRUD con autenticación y guardado de datos',
        tech: ['React', 'Redux', 'Firebase', 'Typescript'],
        link: 'https://github.com/ValentinoZucchellaPaz/AGENDA-TU-SEMANA-REACT',
    },
    {
        id: 6,
        title: 'Lading Page  - 💻',
        description: 'Landing page de una empresa de subtitulado',
        tech: ['React', 'CSS', 'SEO'],
        link: 'https://www.wiwito.com/',
    },
    {
        id: 7,
        title: 'Redux Ex. for Frontend Technical Interview - 💻',
        description: 'CRUD de datos con manejo de estado global',
        tech: ['React', 'Redux', 'Tremor UI'],
        link: 'https://github.com/ValentinoZucchellaPaz/redux_crud_app',
    },
    {
        id: 8,
        title: 'Ecommerce - 💻',
        description: 'Ecommerce como trabajo final de bootcamp',
        tech: ['C', 'VHDL', 'Proteus'],
        link: 'https://github.com/ValentinoZucchellaPaz/E-COMMERCE-REACT',
    },
];