import React from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
export default function AnimatedBackground(props) {
    const particlesInit = React.useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = React.useCallback(async container => {
        await console.log(container);
    }, []);
    const particleOptions={
        background: {
            color: {
                value: "#681897",
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#ededed",
            },
            collisions: {
                enable: true,
            },
            move: {
                directions: "none",
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 100,
            },
            opacity: {
                value: 1,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 0.5, max:2 },
            },
        },
        detectRetina: true,
        fullScreen: false,

    }

    return(
        <div style={{width:"100%",height:"100%" ,backgroundColor:"transparent"}}>
        <Particles   id="tsparticles" init={particlesInit} loaded={particlesLoaded} options={particleOptions} style={{width:"100%",height:"100%"}}/>
        </div>
    );


}