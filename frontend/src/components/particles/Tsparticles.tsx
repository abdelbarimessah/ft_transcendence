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


	if (init) {
		return (
			<div className="absolute w-full h-screen">
				<Particles
					id="tsparticles"
					particlesLoaded={particlesLoaded}
					options={tsParticlesConfig}
				/>
			</div>
		);
	}

	return <></>;
};

export default ParticleBackground;