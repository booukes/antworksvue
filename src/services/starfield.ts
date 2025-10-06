interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
    opacity: number;
    moveFactorX: number;
    moveFactorY: number;
}

interface Meteor {
    x: number;
    y: number;
    len: number;
    speed: number;
    width: number;
}

interface StarTypeConfig {
    count: number;
    size: { min: number; max: number };
    speed: { min: number; max: number };
}

interface StarConfig {
    [key: string]: StarTypeConfig;
}

function runStarfieldAnimation(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
    const MOUSE_SMOOTHING_FACTOR = 0.05;
    const PARALLAX_INTENSITY = 5;
    const METEOR_SPAWN_INTERVAL_MS = 3000;

    const starConfig: StarConfig = {
        slowest: { count: 2000, size: { min: 0.3, max: 0.4 }, speed: { min: 0.1, max: 0.3 }},
        slow: { count: 750, size: { min: 0.4, max: 0.7 }, speed: { min: 0.3, max: 0.4 }},
        medium: { count: 120, size: { min: 0.7, max: 0.9 }, speed: { min: 0.4, max: 0.5 }},
        fast: { count: 20, size: { min: 0.9, max: 1.1 }, speed: { min: 0.5, max: 0.7 }},
        fastest: { count: 10, size: { min: 1.1, max: 1.3 }, speed: { min: 0.7, max: 1.2 }},
        main: { count: 3, size: { min: 1.6, max: 2.0 }, speed: { min: 0.7, max: 1.2 }}
    };

    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMouse = { ...mouse };

    const setCanvasSize = (): void => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    function createStars(): void {
        stars = [];
        Object.values(starConfig).forEach(config => {
            for (let i = 0; i < config.count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * (config.size.max - config.size.min) + config.size.min,
                    speed: Math.random() * (config.speed.max - config.speed.min) + config.speed.min,
                    opacity: Math.random() * 0.5 + 0.5,
                    moveFactorX: Math.random() * (1 - 0.15) + 0.15,
                    moveFactorY: Math.random() * (1 - 0.15) + 0.15,
                });
            }
        });
    }

    function spawnMeteor(): void {
        meteors.push({
            x: Math.random() * canvas.width * 1.5,
            y: -10,
            len: Math.random() * 100 + 50,
            speed: Math.random() * 28 + 12,
            width: Math.random() * 1.5 + 0.5,
        });
    }

    function updateMouse(): void {
        mouse.x += (targetMouse.x - mouse.x) * MOUSE_SMOOTHING_FACTOR;
        mouse.y += (targetMouse.y - mouse.y) * MOUSE_SMOOTHING_FACTOR;
    }

    function animate(): void {
        updateMouse();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const canvasCenterX = canvas.width / 2;
        const canvasCenterY = canvas.height / 2;

        const bgGradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
        bgGradient.addColorStop(0.10, '#000000');
        bgGradient.addColorStop(1, '#290445');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const baseOffsetX = (mouse.x - canvasCenterX) / PARALLAX_INTENSITY;
        const baseOffsetY = (mouse.y - canvasCenterY) / PARALLAX_INTENSITY;

        ctx.fillStyle = `rgba(255, 255, 255, 1)`;
        ctx.beginPath();

        for (const star of stars) {
            star.x -= star.speed * 0.5 * star.moveFactorX;
            star.y += star.speed * 0.5 * star.moveFactorY;

            if (star.x < -star.size) star.x = canvas.width + star.size;
            if (star.y > canvas.height + star.size) star.y = -star.size;

            const parallaxX = (star.x + baseOffsetX * star.speed) | 0;
            const parallaxY = (star.y + baseOffsetY * star.speed) | 0;

            ctx.moveTo(parallaxX + star.size, parallaxY);
            ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2);
        }
        ctx.fill();

        meteors.forEach((meteor: Meteor) => {
            const gradient = ctx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.len, meteor.y + meteor.len);
            gradient.addColorStop(0, `rgba(255, 255, 255, 0.7)`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = meteor.width;
            ctx.moveTo(meteor.x, meteor.y);
            ctx.lineTo(meteor.x - meteor.len, meteor.y + meteor.len);
            ctx.stroke();

            meteor.x -= meteor.speed;
            meteor.y += meteor.speed;
        });

        meteors = meteors.filter(meteor => meteor.x > -meteor.len - 50);

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        setCanvasSize();
        createStars();
    });

    window.addEventListener('mousemove', (e: MouseEvent) => {
        targetMouse.x = e.clientX;
        targetMouse.y = e.clientY;
    });

    setInterval(spawnMeteor, METEOR_SPAWN_INTERVAL_MS);
    setCanvasSize();
    createStars();
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield') as HTMLCanvasElement | null;
    if (!canvas) {
        console.error("Canvas element with id 'starfield' not found.");
        return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error("2D context not available.");
        return;
    }
    runStarfieldAnimation(canvas, ctx);
});
