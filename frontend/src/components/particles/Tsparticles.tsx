'use client'
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import tsParticlesConfig from "../../config/Tsparticles-config";


const ParticleBackground = () => {
	const [init, setInit] = useState(false);

	useEffect(() => {
		initParticlesEngine(async (engine) => {
			await loadSlim(engine);
		}).then(() => {
			setInit(true);
		});
	}, []);

	const particlesLoaded = async (container?: Container): Promise<void> => { };

	// const options = useMemo(
	// 	    () => ({
					
				
	// 				fullScreen: { enable: true },
	// 				style: { position: "absolute" },
	// 				detectRetina: false,
	// 				fpsLimit: 60,
	// 				interactivity: {
	// 				  detectsOn: "canvas",
	// 				  events: {
	// 					onHover: {
	// 					  enable: true,
	// 					  mode: "bubble"
	// 					},
	// 					resize: true
	// 				  },
	// 				  modes: {
	// 					bubble: {
	// 					  distance: 80,
	// 					  duration: 2,
	// 					  opacity: 1,
	// 					  size: 6
	// 					}
	// 				  }
	// 				},
	// 				particles: {
	// 				  color: {
	// 					value: "#0ff"
	// 				  },
	// 				  links: {
	// 					blink: false,
	// 					color: "#fff",
	// 					consent: false,
	// 					distance: 40,
	// 					enable: true,
	// 					opacity: 0.3,
	// 					width: 0.5
	// 				  },
	// 				  move: {
	// 					attract: {
	// 					  enable: false,
	// 					  rotate: {
	// 						x: 600,
	// 						y: 1200
	// 					  }
	// 					},
	// 					bounce: false,
	// 					direction: "none",
	// 					enable: true,
	// 					outMode: "bounce",
	// 					random: false,
	// 					speed: 1,
	// 					straight: false
	// 				  },
	// 				  number: {
	// 					density: {
	// 					  enable: false,
	// 					  area: 2000
	// 					},
	// 					limit: 0,
	// 					value: 400
	// 				  },
	// 				  opacity: {
	// 					animation: {
	// 					  enable: false,
	// 					  minimumValue: 0.05,
	// 					  speed: 2,
	// 					  sync: false
	// 					},
	// 					random: false,
	// 					value: 0.5
	// 				  },
	// 				  shape: {
	// 					type: "circle"
	// 				  },
	// 				  size: {
	// 					animation: {
	// 					  enable: false,
	// 					  minimumValue: 0.1,
	// 					  speed: 40,
	// 					  sync: false
	// 					},
	// 					random: false,
	// 					value: 0.5
	// 				  }
	// 				},
	// 				polygon: {
	// 				  draw: {
	// 					enable: true,
	// 					lineColor: "rgba(0,255,255,0.2)",
	// 					lineWidth: 0.5
	// 				  },
	// 				  move: {
	// 					radius: 20
	// 				  },
	// 				  position: {
	// 					x: 30,
	// 					y: 30
	// 				  },
	// 				  inlineArrangement: "equidistant",
	// 				  scale: 5,
	// 				  type: "inline",
	// 				}
	// 			}))


	if (init) {
		return (
			<div className="absolute w-full h-screen">
				<Particles
					id="tsparticles"
					particlesLoaded={particlesLoaded}
					// options={tsParticlesConfig}
				/>
			</div>
		);
	}

	return <></>;
};

export default ParticleBackground;
